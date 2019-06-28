import { useState, useEffect, useCallback } from 'react';

export interface UseSearchResultConfig<T, S> {
  search: (requestData: S) => Promise<T> | T;
  firstAutoSearch?: boolean;
  defaultRequestData?: S | (() => Promise<S> | S);
}

export const useSearchResult = <T, S>({
  search,
  firstAutoSearch = true,
  defaultRequestData,
}: UseSearchResultConfig<T, S>) => {
  const [requestData, setRequestData] = useState<S>({} as S);
  const [responseData, setResponseData] = useState<T>({} as T);
  const [loading, setLoading] = useState(false);
  const [defaultRequestDataLoading, setDefaultRequestDataLoading] = useState(
    false,
  );

  const searchFunc = useCallback((data: S) => {
    setRequestData(data);
    setLoading(true);
    return Promise.resolve(search(data)).then(response => {
      setResponseData(response);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setDefaultRequestDataLoading(true);
    let value;
    if (typeof defaultRequestData === 'function') {
      value = (defaultRequestData as any)();
    } else {
      value = defaultRequestData;
    }
    Promise.resolve(value).then(data => {
      setRequestData(data);
      setDefaultRequestDataLoading(false);
      if (firstAutoSearch) {
        searchFunc(data);
      }
    }).catch(() => {
      setDefaultRequestDataLoading(false);
    });
  }, []);

  return {
    loading,
    requestData,
    setRequestData,
    responseData,
    defaultRequestDataLoading,
    search: searchFunc,
  };
};
