import { useSearchResult as useSearchResultHooks, UseSearchResultConfig } from '@sunflower-hooks/search-result';
import { useForm, Store } from '@sunflower-antd/form';

export interface SearchResponseData {
  dataSource: Store[];
  total?: number;
}

export interface UseSearchResultAntdConfig
  extends UseSearchResultConfig<SearchResponseData, Store> {
  defaultPageSize?: number;
  defaultCurrent?: number;
  defaultFormValues?: Store | (() => (Promise<Store> | Store));
  form: any;
}


export const useFormTable = (config: UseSearchResultAntdConfig) => {
  const formTableConfig = config || {} as UseSearchResultAntdConfig;
  const {
    search,
    autoFirstSearch = true,
    defaultPageSize = 10,
    defaultCurrent = 1,
    defaultFormValues = {},
    form,
  } = formTableConfig;


  const {
    loading,
    requestData = {} as Store,
    setRequestData,
    responseData = {} as SearchResponseData,
    defaultRequestDataLoading,
    search: searchFunc,
  } = useSearchResultHooks({
    search,
    autoFirstSearch,
    defaultRequestData: () => {
      let value: Store | Promise<Store>;
      if (typeof defaultFormValues === 'function') {
        value = defaultFormValues();
      } else {
        value = defaultFormValues;
      }
      return Promise.resolve(value).then(data => {
        const touched = form.isFieldsTouched();
        const obj = { ...data };
        Object.keys(data).forEach(name => {
          obj[name] = form.isFieldTouched(name) ? form.getFieldValue(name) : data[name];
        });

        if (touched) {
          setRequestData({
            pageSize: defaultPageSize,
            current: defaultCurrent,
            ...obj,
          });
          throw new Error('will not autoFirstSearch');
        }
        return {
          pageSize: defaultPageSize,
          current: defaultCurrent,
          ...obj,
        };
      });
    },
  });

  const { formProps, form: formInstance } = useForm({
    form,
    async submit(values: Store) {
      await searchFunc({
        current: 1,
        pageSize: requestData.pageSize,
        ...values,
      });
    },
    defaultFormValues,
  })


  const onChange = (pagination, filters, sorter) => {
    searchFunc({
      ...requestData,
      current: pagination.current === requestData.current ? 1 : pagination.current,
      pageSize: pagination.pageSize,
      filters,
      sorter,
    });
  };


  const tableProps = {
    pagination: {
      pageSize: requestData.pageSize,
      current: requestData.current,
      defaultPageSize,
      defaultCurrent,
      total: responseData.total,
    },
    loading,
    dataSource: responseData.dataSource,
    onChange,
  }


  const formValues = { ...requestData };
  delete formValues.current;
  delete formValues.pageSize;
  delete formValues.filter;
  delete formValues.sorter;

  return {
    form: formInstance,
    formProps,
    tableProps,
    loading,
    defaultFormValuesLoading: defaultRequestDataLoading,
    formValues,
    filters: requestData.filters,
    sorter: requestData.sorter,
    current: requestData.current,
    pageSize: requestData.pageSize,
    dataSource: responseData.dataSource,
    total: responseData.total,
    search: (data) => {
      searchFunc({
        ...requestData,
        ...data,
      });
    },
  };
};
