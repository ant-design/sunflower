import React from 'react';
import { useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/lib/interface';
import Form from 'sunflower-form';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import {
  useSearchResult as useSearchResultHooks,
  UseSearchResultConfig,
} from '@sunflower-hooks/search-result';

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

export const useSearchResult = ({
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

  const SearchResultForm = props => (
    <Form
      form={form}
      onFinish={(values: Store) =>
        searchFunc({
          ...requestData,
          ...values,
          currentPage: 1,
        })
      }
      {...props}
    />
  );

  const SearchResultTable = (props: TableProps<any>) => {
    const { pagination: customPagination } = props;

    const pagination = {
      onChange(page: number) {
        searchFunc({
          ...requestData,
          currentPage: page,
        });
      },
      onShowSizeChange(page: number, pageSize: number) {
        searchFunc({
          ...requestData,
          currentPage: 1,
          pageSize,
        });
      },
      pageSize: requestData.pageSize as number,
      current: requestData.currentPage as number,
      ...(customPagination || {}),
      defaultPageSize,
      defaultCurrent: defaultCurrentPage,
      total: responseData.total,
    };

    return (
      <Table
        loading={loading}
        dataSource={responseData.list}
        {...props}
        pagination={pagination}
      />
    );
  };

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

export const renderSearchResult = (config, S) => () => (
  <S {...useSearchResult(config)} />
);
