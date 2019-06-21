import React, { useMemo, useState } from 'react';
import { useForm } from 'rc-field-form';
import { Store } from 'rc-field-form/lib/interface';
import Form from 'sunflower-form';
import { Table } from 'antd';


export interface UseSearchResultConfig {
  search: (payload: Store) => (Promise<SearchResponseData> | SearchResponseData);
}

export interface SearchResponseData {
  list: object[];
  total?: number;
}

const createForm = ({
  form,
  onFinish,
}) => (props) => <Form form={form} onFinish={onFinish} {...props} />;

export const useSearchResult = (config: UseSearchResultConfig) => {
  const [form] = useForm();
  const [responseData, setResponseData] = useState({ list: [] });

  const SearchResultForm = useMemo(() => createForm({
    form,
    onFinish(values: Store) {
      const { search } = config;
      Promise.resolve(search(values)).then((data: SearchResponseData) => setResponseData(data));
    },
  }), [form, config]);

  const SearchResultTable = (props) =>
    <Table
      dataSource={responseData.list}
      {...props}
    />;

  SearchResultForm['Item'] = Form.Item;

  return {
    Form: SearchResultForm,
    Table: SearchResultTable,
  };
};

export const renderSearchResult = (config, S) =>
  () => <S {...useSearchResult(config)} />;
