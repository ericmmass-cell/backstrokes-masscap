// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: {
      // Reached through Caddy reverse proxy on the tailnet; trust the forwarded Host.
      allowedHosts: true,
    },
    // Pre-bundle the R3F + three-stdlib chain. Without these in optimizeDeps
    // the TanStack route-split chunk for any page that imports MovementDemo
    // fails to evaluate with "Failed to fetch dynamically imported module"
    // because drei lazily reaches into three-stdlib's GLTFLoader.
    optimizeDeps: {
      include: [
        "three",
        "three-stdlib",
        "@react-three/fiber",
        "@react-three/drei",
      ],
    },
  },
});
