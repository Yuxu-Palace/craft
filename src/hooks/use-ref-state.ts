import { useMemo, useRef } from 'react';
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
): [T, RefStateController<T>] {
  const stateRef = useRef(initialData);
  const originRef = useRef(structuredClone(initialData));
  const _forceUpdate = useForceUpdate();

  // TODO(cmtlyt): react@19.2 版本可以尝试使用 useEffectEvent 来优化部分 hook 对函数的依赖项问题
  const controller = useMemo<RefStateController<T>>(() => {
    const forceUpdate = (update?: boolean) => {
      if (update) {
        _forceUpdate();
      }
    };

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
      forceUpdate: _forceUpdate,
      reset: (update = true) => {
        stateRef.current = originRef.current;
        forceUpdate(update);
      },
    };
  }, [_forceUpdate]);

  return [stateRef.current, controller];
}
