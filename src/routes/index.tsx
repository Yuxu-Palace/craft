import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useRefState } from '../hooks/use-ref-state';

export const Route = createFileRoute('/')({ component: App });

function App() {
  return (
    <section>
      <span>hello world</span>
      <Counter />
    </section>
  );
}

function Counter() {
  const [state, { setState, patchState }] = useRefState({ count: 0 });

  useEffect(() => {
    console.debug('[Counter] init state');
    setState({ count: 1 });
  }, [setState]);

  return (
    <section>
      <span>count: {state.count}</span>
      <button
        onClick={() =>
          patchState((data) => {
            data.count++;
          })
        }
        type="button"
      >
        +1
      </button>
    </section>
  );
}
