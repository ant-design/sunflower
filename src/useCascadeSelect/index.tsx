import { useEffect } from 'react';
import { useCascadeSearch } from '../useCascadeSearch';

export interface OptionData {
  value: string;
  label: string;
}

export interface ListItem {
  name: string;
  options: (...args: any) => OptionData[] | Promise<OptionData[]>;
}

export interface Select {
  props: {
    [key: string]: any;
  };
  options: OptionData[];
}

export interface UseCascadeSelectConfig {
  list: ListItem[];
  autoFirstSearch?: boolean;
  form: any;
}

export const useCascadeSelect = ({
  list = [],
  autoFirstSearch = true,
  form,
}: UseCascadeSelectConfig) => {
  const {
    search,
    responseDataList,
    loadingList,
    setResponseDataList,
  } = useCascadeSearch<OptionData[]>({
    list: list.map(item => (lastValue, ...args) => item.options(...args)),
  });

  const selects: Select[] = list.map((item, index) => {
    const options = responseDataList[index] || [];
    return {
      props: {
        loading: loadingList[index],
        onChange(val) {
          if (val) {
            search(index + 1, val);
          }
          if (form) {
            const values = {};
            for (let i = index + 1; i < list.length; i += 1) {
              values[list[i].name] = undefined;
            }
            const nextResponseDataList = responseDataList.slice(0, index + 1);
            form.setFieldsValue(values);
            setResponseDataList(nextResponseDataList);
          }
        },
      },
      options,
    };
  });

  useEffect(() => {
    if (autoFirstSearch && !responseDataList[0]) {
      search(0);
    }
  }, []);
  return {
    search,
    selects,
  };
};
