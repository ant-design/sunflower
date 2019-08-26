import { useState } from 'react';
import { Form } from 'antd';
import { useSearchResult as useSearchResultHooks, UseSearchResultConfig } from '@sunflower-hooks/search-result';

declare type StoreBaseValue = string | number | boolean;
export declare type StoreValue = StoreBaseValue | Store | StoreBaseValue[];
export interface Store {
    [name: string]: StoreValue;
}
export interface SearchResponseData {
  list: Store[];
  total?: number;
}

export interface UseSearchResultAntdConfig
  extends UseSearchResultConfig<SearchResponseData, Store> {
  defaultPageSize?: number;
  defaultCurrentPage?: number;
  defaultFormValues?: Store | (() => (Promise<Store> | Store));
  form: any;
}


export const useFormTable = (config: UseSearchResultAntdConfig) => {
  const formTableConfig = config || {} as UseSearchResultAntdConfig;
  const {
    search,
    autoFirstSearch = true,
    defaultPageSize = 10,
    defaultCurrentPage = 1,
    defaultFormValues = {},
    form,
  } = formTableConfig;

  let version = 3;
  // antd4
  if (Form['useForm']) {
    version = 4;
  }

  let formInstance = form;
  if (!form) {
    if (version === 4) {
      [formInstance] = Form['useForm']();
    } else {
      throw new Error('"form" need in antd@3');
    }
  }

  const [initialValues, setInitialValues] = useState();
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
        setInitialValues(data);
        form.setFieldsValue(obj);
        if (touched) {
          setRequestData({
            pageSize: defaultPageSize,
            currentPage: defaultCurrentPage,
            ...obj,
          });
          throw new Error('will not autoFirstSearch');
        }
        return {
          pageSize: defaultPageSize,
          currentPage: defaultCurrentPage,
          ...obj,
        };
      });
    },
  });

  const onFinish = (values: Store) => {
    searchFunc({
      currentPage: 1,
      pageSize: requestData.pageSize,
      ...values,
    });
  };

  const onChange = (pagination, filters, sorter) => {
    searchFunc({
      ...requestData,
      currentPage: pagination.current === requestData.currentPage ? 1 : pagination.current,
      pageSize: pagination.pageSize,
      filters,
      sorter,
    });
  };

  const formProps = version === 4 ? {
    form: formInstance,
    onFinish,
    initialValues,
  } : {
    form: formInstance,
    onSubmit(e) {
      e.preventDefault();
      formInstance.validateFields((err, values) => {
        if (!err) {
          searchFunc({
            currentPage: 1,
            pageSize: requestData.pageSize,
            ...values,
          });
        }
      });
    },
  };


  const tableProps = {
    pagination: {
      pageSize: requestData.pageSize,
      current: requestData.currentPage,
      defaultPageSize,
      defaultCurrent: defaultCurrentPage,
      total: responseData.total,
    },
    loading,
    dataSource: responseData.list,
    onChange,
  }


  const formValues = { ...requestData };
  delete formValues.currentPage;
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
    currentPage: requestData.currentPage,
    pageSize: requestData.pageSize,
    list: responseData.list,
    total: responseData.total,
    search: (data) => {
      searchFunc({
        ...requestData,
        ...data,
      });
    },
  };
};
