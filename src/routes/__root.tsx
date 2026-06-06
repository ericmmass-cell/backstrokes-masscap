import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">This page isn't where we left it.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A dead link, an old bookmark, or a page we moved without leaving a note. Exactly the kind of follow-through we built this whole thing to complain about. Let's get you somewhere that exists.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to the home page
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Something broke. Not your back, for once.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A piece of this page fell over on our end. A refresh usually gets it back up. If it keeps happening, it's us, not your connection.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BackStroke" },
      { name: "description", content: "Back pain and sex, on one chart. A daily spine protocol and a position plan built around whichever back is the actual problem. Public-source biomechanics, zero candles." },
      { name: "author", content: "BackStroke" },
      { property: "og:title", content: "BackStroke. Back pain and sex, on one chart." },
      { property: "og:description", content: "A daily spine protocol and a position plan built around whichever back is the actual problem. Public-source biomechanics, zero candles." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://backstroke.mass-cap.com/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BackStroke. Back pain and sex, on one chart." },
      { name: "twitter:description", content: "A daily spine protocol and a position plan built around whichever back is the actual problem. Public-source biomechanics, zero candles." },
      { name: "twitter:image", content: "https://backstroke.mass-cap.com/og-cover.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#722B2B" />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
