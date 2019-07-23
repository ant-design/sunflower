import React, { useMemo, useRef, useEffect } from 'react';
import { Select } from 'antd';
import { useStore } from '@sunflower-hooks/store';
import { useCascadeSearch, UseCascadeSearchConfig } from '@sunflower-hooks/cascade-search';
import { SelectProps } from 'antd/lib/select';


export interface OptionData {
  value: string;
  label: string;
}

export type OptionDataList = OptionData[];

export interface UseCascadeSelectConfig extends UseCascadeSearchConfig<OptionDataList>{
  autoFirstSearch: boolean;
  form: any;
}

export const useCascadeSelect = ({
  list = [],
  autoFirstSearch = true,
}: UseCascadeSelectConfig) => {
  const {
    search,
    responseDataList,
    loadingList,
    setResponseDataList,
  } = useCascadeSearch({
    list: list.map(item => (lastValue, ...args) => item(...args)),
  });
  const obj = useRef([]);
  const { get, set } = useStore<{
    responseDataList: OptionDataList[];
    loadingList: boolean[];
    search: any;
  }>();
  set({
    responseDataList,
    loadingList,
    search,
  });

  const selects = useMemo(() => list.map((item, index) => function Component(props: SelectProps) {
    if (props['__sunflower']) {
      const { name } = props['__sunflower'];
      obj.current[index] = name;
    }
    const options = get().responseDataList[index];
    const { value } = props;
    useEffect(() => {
      if (value && options) {
        get().search(index + 1, props.value);
      }
    }, [value, options]);
    return <Select
      loading={get().loadingList[index]}
      {...props}
      value={options && value}
      onChange={(val, option) => {
        if (props.onChange) {
          props.onChange(val, option);
        }
        if (props['__sunflower']) {
          const { form } = props['__sunflower'];
          const values = {};
          for (let i = index + 1; i < obj.current.length; i += 1) {
            values[obj.current[i]] = undefined;
          }
          const nextResponseDataList = get().responseDataList.slice(0, index + 1);
          form.setFieldsValue(values);
          setResponseDataList(nextResponseDataList);
        }
    }}>
      {
        options && options.map(option =>
          <Select.Option value={option.value} key={option.value}>
            {option.label}
          </Select.Option>)
      }
    </Select>;
  }), []);
  useEffect(() => {
    if (autoFirstSearch && !responseDataList[0]) {
      search(0);
    }
  }, []);
  return {
    search,
    selects,
    optionsList: responseDataList,
    loadingList,
  };
};
