import { lazy } from 'react';

const TanstackDevtools = lazy(() =>
  import('./tanstack-devtools').then((module) => {
    return { default: module.Devtools };
  }),
);

export function DevtoolsPanel() {
  if (import.meta.env.PROD) {
    return null;
  }

  return <TanstackDevtools />;
}
