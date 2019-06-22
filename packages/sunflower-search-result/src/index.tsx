import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/lib/interface';
import Form from 'sunflower-form';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';


export interface UseSearchResultConfig {
  search: (payload: Store) => (Promise<SearchResponseData> | SearchResponseData);
  defaultPageSize?: number;
  defaultCurrentPage?: number;
  firstAutoSearch?: boolean;
}

export interface SearchResponseData {
  list: object[];
  total?: number;
}


export const useSearchResult = ({
  search,
  defaultPageSize = 10,
  defaultCurrentPage = 1,
  firstAutoSearch = true,
}: UseSearchResultConfig) => {
  const [form] = useForm();
  const [requestData, setRequestData] = useState<Store>({
    currentPage: defaultCurrentPage,
    pageSize: defaultPageSize,
  });
  const [responseData, setResponseData] = useState<SearchResponseData>({ list: [] });
  const [loading, setLoading] = useState(false);
  const didMountRef = useRef(false);

  const SearchResultForm = (props) =>
    <Form
      form={form}
      onFinish={(values: Store) => setRequestData({
        ...requestData,
        ...values,
        currentPage: 1,
      })}
      {...props}
    />;

  const SearchResultTable = (props: TableProps<any>) => {
    const {
      pagination: customPagination,
    } = props;

    const pagination = {
      onChange(page) {
        setRequestData({
          ...requestData,
          currentPage: page,
        });
      },
      onShowSizeChange(page, pageSize) {
        setRequestData({
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

    return <Table
      loading={loading}
      dataSource={responseData.list}
      {...props}
      pagination={pagination}
    />;
  };

  SearchResultForm['Item'] = Form.Item;

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      if (!firstAutoSearch) {
        return;
      }
    }
    setLoading(true);
    Promise.resolve(search(requestData))
      .then((data: SearchResponseData) => {
        setLoading(false);
        setResponseData(data);
      });
  }, [requestData]);

  return {
    Form: SearchResultForm,
    Table: SearchResultTable,
    loading,
    requestData,
    setRequestData,
    responseData,
    form,
  };
};

export const renderSearchResult = (config, S) =>
  () => <S {...useSearchResult(config)} />;
