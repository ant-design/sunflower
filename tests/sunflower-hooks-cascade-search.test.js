import { renderHook } from '@testing-library/react-hooks';
import { useCascadeSearch } from '../packages/sunflower-hooks-cascade-search/src';


test('useCascadeSearch', async () => {
  const config = {
    list: [
      () => {
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
    useCascadeSearch(config),
  );
  result.current.search(0);
  expect(result.current.loadingList).toEqual([true, false]);
  await waitForNextUpdate();
  expect(result.current.loadingList).toEqual([false, false]);
  expect(result.current.responseDataList).toEqual([[{ label: '1', value: '1' }]]);
  result.current.search(1, '1');
  expect(result.current.loadingList).toEqual([false, true]);
  await waitForNextUpdate();
  expect(result.current.loadingList).toEqual([false, false]);
  expect(result.current.responseDataList).toEqual([[{"label": "1", "value": "1"}], [{"label": "2", "value": "2"}]]);
});
