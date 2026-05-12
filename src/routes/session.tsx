import { createFileRoute } from "@tanstack/react-router";
import { Player } from "@/components/session/Player";

export const Route = createFileRoute("/session")({
  component: SessionPage,
  head: () => ({
    meta: [
      { title: "BackStroke — run a session" },
      { name: "description", content: "The eight-minute daily protocol. McGill big-3, hip hinge, reverse kegel, down-regulate. Run it now." },
      { property: "og:title", content: "BackStroke — run a session" },
      { property: "og:description", content: "The eight-minute daily protocol. No signup. No app store. Just the work." },
    ],
  }),
});

function SessionPage() {
  return <Player />;
}
