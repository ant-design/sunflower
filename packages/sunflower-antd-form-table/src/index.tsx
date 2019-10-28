import { useState } from 'react';
import { Form } from 'antd';
import { useSearchResult as useSearchResultHooks, UseSearchResultConfig } from '@sunflower-hooks/search-result';

declare type StoreBaseValue = string | number | boolean;
export declare type StoreValue = StoreBaseValue | Store | StoreBaseValue[];
export interface Store {
  [name: string]: StoreValue;
}
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

  const onFinish = (values: Store) => {
    searchFunc({
      current: 1,
      pageSize: requestData.pageSize,
      ...values,
    });
  };

  const onChange = (pagination, filters, sorter) => {
    searchFunc({
      ...requestData,
      current: pagination.current === requestData.current ? 1 : pagination.current,
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
    onSubmit(e) {
      e.preventDefault();
      formInstance.validateFields((err, values) => {
        if (!err) {
          searchFunc({
            current: 1,
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
    current: requestData.current as number,
    pageSize: requestData.pageSize as number,
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
