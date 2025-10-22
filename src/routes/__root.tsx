import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router';
import type React from 'react';
import { PageError } from '@/components/page-error';
import { PageNotFound } from '@/components/page-not-found';
import { PagePending } from '@/components/page-pending';
import resetCss from '@/reset.css?url';
import { DevtoolsPanel } from '../components/devtools';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => {
    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title: 'TanStack Start Starter' },
      ],
      links: [{ rel: 'stylesheet', href: resetCss }],
    };
  },

  shellComponent: RootDocument,

  notFoundComponent: PageNotFound,
  errorComponent: PageError,
  pendingComponent: PagePending,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}

        <DevtoolsPanel />
        <Scripts />
      </body>
    </html>
  );
}
