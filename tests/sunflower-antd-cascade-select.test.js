import { renderHook } from '@testing-library/react-hooks';
import { useCascadeSelect } from '../packages/sunflower-antd/src';

test('useCascadeSelect', async () => {
  const setFieldsValue = jest.fn()
  const config = {
    list: [
      {
        name: '1',
        options: async () => {
          await new Promise(r => setTimeout(r, 200));
          return [
            {
              label: '1',
              value: '1',
            },
          ];
        },
      },
      {
        name: '2',
        options: async (value) => {
          await new Promise(r => setTimeout(r, 200));
          return value === '1' ? [
            {
              label: '2',
              value: '2',
            },
          ] : [];
        },
      },
    ],
    autoFirstSearch: true,
    form: {
      setFieldsValue,
    },
  };
  const { result, waitForNextUpdate } = renderHook(() =>
    useCascadeSelect(config),
  );
  expect(result.current.selects.length).toBe(2);
  expect(result.current.selects[0].options).toEqual([]);
  expect(result.current.selects[1].options).toEqual([]);
  await waitForNextUpdate();
  expect(result.current.selects[0].options).toEqual([
    {
      label: '1',
      value: '1',
    },
  ]);
  result.current.selects[0].props.onChange('1')
  expect(setFieldsValue).toBeCalled();
  await waitForNextUpdate();
  expect(result.current.selects[1].options).toEqual([
    {
      label: '2',
      value: '2',
    },
  ]);
});
