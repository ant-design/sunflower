import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useCascadeSelect } from '../packages/sunflower-antd-cascade-select/src';

test('useCascadeSelect', async () => {
  const config = {
    list: [
      async () => {
        await new Promise(r => setTimeout(r, 200));
        return [
          {
            label: '1',
            value: '1',
          },
        ];
      },
      async (lastValue, value) => {
        await new Promise(r => setTimeout(r, 200));
        return value === '1' ? [
          {
            label: '2',
            value: '2',
          },
        ] : [];
      },
    ],
    autoFirstSearch: false,
  };
  const { result, waitForNextUpdate } = renderHook(() =>
    useCascadeSelect(config),
  );
  const { selects } = result.current;
  const [Select0, Select1] = selects;
  render(
    <>
      <Select0 />
      <Select1 />
    </>);
  result.current.search(0);
  await waitForNextUpdate();
  expect(result.current.optionsList).toEqual([[{ label: '1', value: '1' }]]);
});
