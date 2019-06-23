import { renderHook, act } from '@testing-library/react-hooks';
import { useSearchResult } from '../packages/sunflower-search-result/src';


test('useSearchResult', async () => {
  const config = {
    search: () => new Promise(r => setTimeout(() => r({
      list: [{
        name: 'lily',
      }, {
        name: 'jack',
      }],
      total: 10,
    }), 200)),
    firstAutoSearch: false,
  };
  const { result, waitForNextUpdate } = renderHook(() => useSearchResult(config));

  expect(result.current.requestData).toEqual({
    currentPage: 1,
    pageSize: 10,
  });

  act(() => {
    result.current.setRequestData({
      ...result.current.requestData,
      currentPage: 2,
      pageSize: 2,
    });
  });

  await waitForNextUpdate();

  expect(result.current.requestData).toEqual({
    currentPage: 2,
    pageSize: 2,
  });

  expect(result.current.responseData).toEqual({
    list: [{
      name: 'lily',
    }, {
      name: 'jack',
    }],
    total: 10,
  });
});
