-- ============================================================
-- BackStroke event store schema
-- Paste this into the Supabase SQL editor on first project setup.
-- Idempotent: safe to run more than once.
-- ============================================================

-- The append-only event log. Every meaningful user action lands here.
-- We never UPDATE. We never DELETE outside of a user-initiated wipe.
create table if not exists events (
  id          uuid primary key default gen_random_uuid(),
  user_id     text not null,
  session_id  text not null,
  event_name  text not null,
  props       jsonb not null default '{}'::jsonb,
  client_ts   timestamptz not null,
  server_ts   timestamptz not null default now()
);

-- Read patterns: by user, newest first; by event name (for funnel queries).
create index if not exists events_user_ts_idx on events (user_id, client_ts desc);
create index if not exists events_name_idx    on events (event_name);
create index if not exists events_server_idx  on events (server_ts desc);

-- RLS on. The anon key may INSERT but never SELECT another user's rows.
alter table events enable row level security;

-- Anyone with the anon key may write events. We trust client_ts because the
-- Index is computed from it, and we trust user_id because it's an opaque
-- per-device id with no claim on a real human identity.
drop policy if exists events_insert_anon on events;
create policy events_insert_anon on events
  for insert
  to anon
  with check (true);

-- No anonymous reads. Reads happen from a server context with the service
-- role key, or via signed-in users (a future Auth integration).
drop policy if exists events_select_authed on events;
create policy events_select_authed on events
  for select
  to authenticated
  using (auth.uid()::text = user_id);

-- ============================================================
-- Founding-member spot counter (materialized for fast reads on /buy)
-- ============================================================
create or replace view founding_member_count as
select count(*)::int as claimed
from events
where event_name = 'checkout.completed'
  and (props->>'sku') = 'founding';

grant select on founding_member_count to anon;
