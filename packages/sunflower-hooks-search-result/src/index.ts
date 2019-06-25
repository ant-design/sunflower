import { useState, useEffect, useCallback } from 'react';

export interface UseSearchResultConfig<T, S> {
  search: (requestData: S) => Promise<T> | T;
  firstAutoSearch?: boolean;
  defaultRequestData?: S | Promise<S>;
}

export const useSearchResult = <T, S>({
  search,
  firstAutoSearch = true,
  defaultRequestData = {} as S,
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
    Promise.resolve(defaultRequestData).then(data => {
      setRequestData(data);
      setDefaultRequestDataLoading(false);
      if (firstAutoSearch) {
        searchFunc(data);
      }
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
