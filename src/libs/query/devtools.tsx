import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';

export const devtoolsPlugin = {
  name: 'Tanstack Query',
  render: <ReactQueryDevtoolsPanel />,
};
