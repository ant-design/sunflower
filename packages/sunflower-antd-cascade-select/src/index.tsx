import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Select } from 'antd';
import { useStore } from '@sunflower-hooks/store';
import { useCascadeSearch, UseCascadeSearchConfig } from '@sunflower-hooks/cascade-search';


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
  const { search, responseDataList, loadingList } = useCascadeSearch({
    list: list.map(item => (lastValue, ...args) => item(...args)),
  });
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

  const selects = useMemo(() => list.map((item, index) => {
    return (props) => {

      const options = get().responseDataList[index];
      return <Select 
        loading={get().loadingList[index]}
        {...props}
        onChange={(...args) => {
          if (props.onChange) {
            props.onChange(...args);
          }
          get().search(index + 1, ...args);
      }}>
        {
          options && options.map(option =>
            <Select.Option value={option.value} key={option.value}>
              {option.label}
            </Select.Option>
          )
        }
      </Select>
    };
  }), []);
  useEffect(() => {
    if (autoFirstSearch && !responseDataList[0]) {
      search(0);
    }
  }, []);
  return {
    search,
    selects,
    responseDataList,
    loadingList,
  }
};

