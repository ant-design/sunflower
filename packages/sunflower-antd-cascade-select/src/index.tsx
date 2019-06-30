import React, { useState, useCallback, useEffect } from 'react';
import { Select } from 'antd';
import { useStore } from '@sunflower-hooks/store';
import { useCascadeSearch, UseCascadeSearchConfig } from '@sunflower-hooks/cascade-search';


export interface OptionData {
  value: string;
  label: string;
}

export type OptionDataList = OptionData[];

export interface UseCascadeSelectConfig extends UseCascadeSearchConfig<OptionDataList>{
  firstOptions?: OptionDataList | (() => (OptionDataList | Promise<OptionDataList>))
}

export const useCascadeSelect = ({
  list = [],
  firstOptions = [],
}: UseCascadeSelectConfig) => {
  const { search, responseDataList } = useCascadeSearch({
    list: list.map(item => {
      return (...args) => {
        item(undefined, ...args);
      }
    })
  });
  const [ firstOptionsList, setFirstOptionsList ] = useState([]);
  const selects = list.map((item, index) => {
    return (props) => {
      const options = index === 0 ? firstOptionsList : responseDataList[index - 1];
      return <Select onChange={(value) => {
        search(index, value);
      }} {...props}>
        {
          options.map(option =>
            <Select.Option value={option.value} key={option.value}>
              {option.label}
            </Select.Option>
          )
        }
      </Select>
    };
  });
  useEffect(() => {
    let result: OptionDataList | Promise<OptionDataList>;
    if (typeof firstOptions === 'function') {
      result = firstOptions();
    } else {
      result = firstOptions;
    }
    Promise.resolve(result).then(options => {
      setFirstOptionsList(options);
    });
  }, []);
  return {
    selects,
  }
};

