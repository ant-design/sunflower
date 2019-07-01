import React, { useState, useCallback } from 'react';
import { useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/lib/interface';
import Form from 'sunflower-form';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import {
  useSearchResult as useSearchResultHooks,
  UseSearchResultConfig,
} from '@sunflower-hooks/search-result';
import { useStore } from '@sunflower-hooks/store';


export interface SearchResponseData {
  list: Store[];
  total?: number;
}

export interface UseSearchResultAntdConfig
  extends UseSearchResultConfig<SearchResponseData, Store> {
  defaultPageSize?: number;
  defaultCurrentPage?: number;
  defaultFormValues?: Store | (() => (Promise<Store> | Store));
}


export const useFormTable = ({
  search,
  firstAutoSearch = true,
  defaultPageSize = 10,
  defaultCurrentPage = 1,
  defaultFormValues = {},
}: UseSearchResultAntdConfig) => {
  const [form] = useForm();
  const [initialValues, setInitialValues] = useState();
  const {
    loading,
    requestData,
    setRequestData,
    responseData,
    defaultRequestDataLoading,
    search: searchFunc,
  } = useSearchResultHooks({
    search,
    firstAutoSearch,
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
          throw new Error('will not firstAutoSearch');
        }
        return {
          pageSize: defaultPageSize,
          currentPage: defaultCurrentPage,
          ...obj,
        };
      });
    },
  });

  const { get, set } = useStore<{
    requestData: Store;
    responseData: SearchResponseData;
    loading: boolean;
    initialValues: Store;
  }>();
  set({
    requestData,
    responseData,
    loading,
    initialValues,
  });

  const onFinish = useCallback((values: Store) => {
    searchFunc({
      ...get().requestData,
      ...values,
      currentPage: 1,
    });
  }, []);

  const SearchResultForm = useCallback(props => <Form
    form={form}
    onFinish={onFinish}
    initialValues={get().initialValues}
    {...props}
  />, []);

  const onPaginationChange = useCallback((page: number) => {
    searchFunc({
      ...get().requestData,
      currentPage: page,
    });
  }, []);

  const onPaginationShowSizeChange = useCallback((page: number, pageSize: number) => {
    searchFunc({
      ...get().requestData,
      currentPage: 1,
      pageSize,
    });
  }, []);

  const SearchResultTable = useCallback((props: TableProps<any>) => {
    const { pagination: customPagination } = props;
    const store = get();
    const pagination = {
      onChange: onPaginationChange,
      onShowSizeChange: onPaginationShowSizeChange,
      pageSize: store.requestData.pageSize as number,
      current: store.requestData.currentPage as number,
      ...(customPagination || {}),
      defaultPageSize,
      defaultCurrent: defaultCurrentPage,
      total: store.responseData.total,
    };
    return (
      <Table
        loading={store.loading}
        dataSource={store.responseData.list}
        {...props}
        pagination={pagination}
      />
    );
  }, []);

  SearchResultForm['Item'] = Form.Item;

  return {
    Form: SearchResultForm,
    Table: SearchResultTable,
    form,
    loading,
    requestData,
    setRequestData,
    responseData,
    defaultFormValuesLoading: defaultRequestDataLoading,
    search: searchFunc,
    pagination: {
      onChange: onPaginationChange,
      onShowSizeChange: onPaginationShowSizeChange,
    },
    onFinish,
  };
};
