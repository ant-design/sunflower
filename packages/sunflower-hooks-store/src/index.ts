import { useRef, useCallback, useEffect } from 'react';
import { ulid } from 'ulid';

const map = {};
export const useStore = () => {
  const obj = useRef(ulid());
  const id = obj.current;
  const get = useCallback(() => map[id], []);
  const set = useCallback((value: any) => {
    map[id] = value;
  }, []);
  useEffect(() => () => {
    delete map[id];
  }, []);
  return [get, set];
};
