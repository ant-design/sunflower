import React, { useCallback } from 'react';
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
  defaultFormValues?: Store | Promise<Store>;
}


export const useFormTable = ({
  search,
  firstAutoSearch = true,
  defaultPageSize = 10,
  defaultCurrentPage = 1,
  defaultFormValues = {},
}: UseSearchResultAntdConfig) => {
  const [form] = useForm();
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
    defaultRequestData: Promise.resolve(defaultFormValues).then(data => ({
      pageSize: defaultPageSize,
      currentPage: defaultCurrentPage,
      ...data,
    })),
  });

  const { get, set } = useStore();
  set({
    requestData,
    responseData,
    loading,
  });

  const SearchResultForm = useCallback(props => (
    <Form
      form={form}
      onFinish={(values: Store) =>
        searchFunc({
          ...get().requestData,
          ...values,
          currentPage: 1,
        })
      }
      {...props}
    />
  ), []);

  const SearchResultTable = useCallback((props: TableProps<any>) => {
    const { pagination: customPagination } = props;
    const store = get();
    const pagination = {
      onChange(page: number) {
        searchFunc({
          ...store.requestData,
          currentPage: page,
        });
      },
      onShowSizeChange(page: number, pageSize: number) {
        searchFunc({
          ...store.requestData,
          currentPage: 1,
          pageSize,
        });
      },
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

  SearchResultForm.Item = Form.Item;

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
  };
};
