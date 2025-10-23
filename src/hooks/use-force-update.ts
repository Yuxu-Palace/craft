import { useReducer } from 'react';

/**
 * 用于强制更新组件
 */
export function useForceUpdate() {
  const [, update] = useReducer(() => Math.random(), 0);

  return update;
}
