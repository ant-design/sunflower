import { useRef, useCallback } from 'react';


export const useStore = function <T> () {
  const obj = useRef<T>();
  const get = useCallback(() => obj.current, []);
  const set = useCallback((value: T) => {
    obj.current = value;
  }, []);
  return {
    get,
    set,
  };
};
