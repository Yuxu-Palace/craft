import { useEffectEvent, useMemo, useRef } from 'react';
import { useForceUpdate } from './use-force-update';

interface RefStateController<T> {
  getState: () => T;
  setState: (newState: T | ((oldData: T) => T)) => void;
  patchState: (patchFn: (oldData: T) => void, update?: boolean) => void;
  forceUpdate: (update?: boolean) => void;
  reset: () => void;
}

interface RefStateOptions<T> {
  cloneFn: (data: T) => T;
}

/**
 * 用于处理难以分割的多 state 问题, 可自主控制组件更新, 降低组件复杂度
 */
export function useRefState<T extends Record<PropertyKey, any>>(
  initialData: T,
  _options?: RefStateOptions<T>,
): readonly [T, RefStateController<T>] {
  const stateRef = useRef(initialData);
  const originRef = useRef(structuredClone(initialData));
  const _forceUpdate = useForceUpdate();

  const forceUpdate = useEffectEvent((update?: boolean) => {
    if (update) {
      _forceUpdate();
    }
  });

  const controller = useMemo<RefStateController<T>>(() => {
    return {
      getState: () => stateRef.current,
      setState: (newState, update = true) => {
        const patchFn = typeof newState === 'function' ? newState : () => newState;
        const newData = patchFn(stateRef.current);
        stateRef.current = newData;
        forceUpdate(update);
      },
      patchState: (patchFn, update = true) => {
        patchFn(stateRef.current);
        forceUpdate(update);
      },
      forceUpdate,
      reset: (update = true) => {
        stateRef.current = originRef.current;
        forceUpdate(update);
      },
    };
  }, []);

  return [stateRef.current, controller] as const;
}
