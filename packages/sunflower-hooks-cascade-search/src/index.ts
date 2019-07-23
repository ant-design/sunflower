import { useState } from 'react';

export interface UseCascadeSearchConfig<T> {
  list : ((...args: any) => T | Promise<T>)[];
}

export const useCascadeSearch = <T>({
  list = [],
}: UseCascadeSearchConfig<T>) => {
  const [responseDataList, setResponseDataList] = useState([] as T[]);
  const [loadingList, setLoadingList] = useState(list.map(() => false) as boolean[]);
  const search = (index: number, ...args: any) => {
    if (index >= list.length || index < 0) {
      return;
    }
    if (index > 0 && !responseDataList[index - 1]) {
      return;
    }
    const array = [...responseDataList.slice(0, index)];
    setResponseDataList(array);
    const loading = [...loadingList];
    loading[index] = true;
    setLoadingList(loading);
    Promise.resolve(list[index](responseDataList[index - 1], ...args))
      .then(value => {
        const nextArray = [...responseDataList.slice(0, index + 1)];
        nextArray[index] = value;
        const nextLoading = [...loadingList];
        nextLoading[index] = false;
        setLoadingList(nextLoading);
        setResponseDataList(nextArray);
      });
  };
  return {
    search,
    responseDataList,
    loadingList,
    setResponseDataList,
  };
};
