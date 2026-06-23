/**
 * Append-only event store.
 *
 * Philosophy (per Karri Saarinen's council note, the "longitudinal moat"):
 * every meaningful user action is captured the moment it happens, as an
 * immutable event, with enough context to reconstruct any derived state
 * (the Index, the streak, the recommendation, the ledger entry). We never
 * mutate. We never delete. We compute.
 *
 * Transport:
 *   - If VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are present, events
 *     POST to a Supabase REST endpoint (table: `events`).
 *   - In all cases the event is mirrored to localStorage so the app works
 *     offline, in dev, and during outages. The Index is computed from the
 *     local mirror; Supabase is the long-term ledger.
 *
 * The Supabase schema this expects:
 *   create table events (
 *     id           uuid primary key default gen_random_uuid(),
 *     user_id      text not null,
 *     session_id   text not null,
 *     event_name   text not null,
 *     props        jsonb not null default '{}',
 *     client_ts    timestamptz not null,
 *     server_ts    timestamptz not null default now()
 *   );
 *   create index on events (user_id, client_ts desc);
 *   create index on events (event_name);
 *
 * No PII is stored beyond the user's own check-in answers, which the user
 * sees and can export. We do not enrich with IP, fingerprint, or device id
 * beyond what the user explicitly provides.
 */

const LS_EVENTS = "bs.events.v1";
const LS_USER = "bs.userId.v1";
const LS_SESSION = "bs.sessionId.v1";

/** Canonical event names. Add new ones here, never inline strings. */
export type EventName =
  | "app.opened"
  | "checkin.started"
  | "checkin.submitted"
  | "move.started"
  | "move.completed"
  | "move.skipped"
  | "session.started"
  | "session.completed"
  | "engine.opened"
  | "engine.filter.set"
  | "engine.plan.generated"
  | "engine.plan.saved"
  | "engine.plan.printed"
  | "engine.plan.shared"
  | "flare.flagged"
  | "stop.invoked"
  | "checkout.started"
  | "checkout.completed"
  | "checkout.cancelled"
  | "diagnosis.completed"
  | "rx.generated"
  | "rx.landed";

export type EventProps = Record<string, unknown>;

export interface BSEvent {
  id: string;
  user_id: string;
  session_id: string;
  event_name: EventName;
  props: EventProps;
  client_ts: string; // ISO
}

/* --------------------------------- ids --------------------------------- */

function uuid(): string {
  // crypto.randomUUID is available in all modern browsers and Bun.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback for ancient environments.
  return "x-x-x-x-x".replace(/x/g, () =>
    Math.floor(Math.random() * 1e9).toString(36)
  );
}

function getUserId(): string {
  if (typeof localStorage === "undefined") return "anon";
  let id = localStorage.getItem(LS_USER);
  if (!id) {
    id = uuid();
    localStorage.setItem(LS_USER, id);
  }
  return id;
}

function getSessionId(): string {
  if (typeof sessionStorage === "undefined") return "anon";
  let id = sessionStorage.getItem(LS_SESSION);
  if (!id) {
    id = uuid();
    sessionStorage.setItem(LS_SESSION, id);
  }
  return id;
}

/* ---------------------------- local mirror ---------------------------- */

function readLocal(): BSEvent[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_EVENTS);
    return raw ? (JSON.parse(raw) as BSEvent[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(events: BSEvent[]): void {
  if (typeof localStorage === "undefined") return;
  // Cap local mirror at 5,000 events so we never blow out the LS quota.
  const trimmed = events.length > 5000 ? events.slice(-5000) : events;
  try {
    localStorage.setItem(LS_EVENTS, JSON.stringify(trimmed));
  } catch {
    // Quota exceeded. Drop oldest half and retry once.
    try {
      localStorage.setItem(
        LS_EVENTS,
        JSON.stringify(trimmed.slice(-Math.floor(trimmed.length / 2)))
      );
    } catch {
      // Give up silently. The Supabase ledger is still the source of truth.
    }
  }
}

/* ----------------------------- transport ----------------------------- */

function supabaseConfig(): { url: string; key: string } | null {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url, key };
}

async function sendToSupabase(event: BSEvent): Promise<void> {
  const cfg = supabaseConfig();
  if (!cfg) return;
  try {
    await fetch(`${cfg.url}/rest/v1/events`, {
      method: "POST",
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(event),
      // Don't block UI on slow networks.
      keepalive: true,
    });
  } catch {
    // Network failed. The local mirror has the event. A reconcile job can
    // upload missed events on the next successful track().
  }
}

/* ------------------------------- public ------------------------------- */

/**
 * Record an event. Returns the stored event. Fire-and-forget: the
 * Supabase write is non-blocking. The local mirror is synchronous so
 * derived state (Index, ledger) is immediately correct.
 */
export function track(name: EventName, props: EventProps = {}): BSEvent {
  const event: BSEvent = {
    id: uuid(),
    user_id: getUserId(),
    session_id: getSessionId(),
    event_name: name,
    props,
    client_ts: new Date().toISOString(),
  };
  const events = readLocal();
  events.push(event);
  writeLocal(events);
  // Don't await; UI shouldn't block on network.
  void sendToSupabase(event);
  return event;
}

/** Read all events for the current user from the local mirror. */
export function allEvents(): BSEvent[] {
  return readLocal();
}

/** Read events since a given ISO timestamp. */
export function eventsSince(iso: string): BSEvent[] {
  return readLocal().filter((e) => e.client_ts >= iso);
}

/** Read events of one name, newest first. */
export function eventsOf(name: EventName, limit = 100): BSEvent[] {
  return readLocal()
    .filter((e) => e.event_name === name)
    .slice(-limit)
    .reverse();
}

/** Wipe local mirror (settings page / dev). Does not touch Supabase. */
export function wipeLocal(): void {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(LS_EVENTS);
  }
}

/** Is the cloud ledger configured? */
export function hasCloudLedger(): boolean {
  return supabaseConfig() !== null;
}
