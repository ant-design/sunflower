import { useState, useCallback } from 'react';

export interface UseCascadeSearchConfig<T> {
  list : ((lastValue: T, ...args: any) => T | Promise<T>)[];
}

export const useCascadeSearch = <T>({
  list = [],
}: UseCascadeSearchConfig<T>) => {
  const [responseDataList, setResponseDataList] = useState([] as T[]);
  const search = useCallback(async (index: number, ...args: any) => {
    if (index >= list.length || index < 0) {
      return;
    }
    if (index > 0 && !responseDataList[index - 1]) {
      return;
    }
    const value = await Promise.resolve(list[index](responseDataList[index - 1], ...args));
    const next = index + 1;
    const array = [...responseDataList.slice(0, next + 1)];
    array[next] = value;
    setResponseDataList(array);
  }, [responseDataList]);
  return {
    search,
    responseDataList,
  };
};
