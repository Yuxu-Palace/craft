import { TanStackDevtools } from '@tanstack/react-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { devtoolsPlugin as TanStackQueryDevtools } from '@/libs/query';

export function Devtools() {
  return (
    <TanStackDevtools
      config={{
        position: 'bottom-right',
        defaultOpen: false,
      }}
      plugins={[
        {
          name: 'Tanstack Router',
          render: <TanStackRouterDevtoolsPanel />,
        },
        TanStackQueryDevtools,
      ]}
    />
  );
}
