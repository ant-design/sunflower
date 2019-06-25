import { useRef, useCallback } from 'react';


export const useStore = () => {
  const obj = useRef({});
  const get = useCallback(() => obj.current, []);
  const set = useCallback((value: any) => {
    obj.current = value;
  }, []);
  return {
    get,
    set,
  };
};
