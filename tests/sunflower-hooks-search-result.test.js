import { renderHook, act } from '@testing-library/react-hooks';
import { useSearchResult } from '../packages/sunflower-hooks-search-result/src';

test('useSearchResult', async () => {
  const config = {
    search: () =>
      new Promise(r =>
        setTimeout(
          () =>
            r({
              list: [
                {
                  name: 'lily',
                },
                {
                  name: 'jack',
                },
              ],
              total: 10,
            }),
          200,
        ),
      ),
    defaultRequestData: new Promise(r =>
      setTimeout(() => {
        r({
          a: 1,
          b: 2,
        });
      }, 20),
    ),
    autoFirstSearch: false,
  };
  const { result, waitForNextUpdate } = renderHook(() =>
    useSearchResult(config)
  );

  expect(result.current.requestData).toEqual({});
  await waitForNextUpdate();
  expect(result.current.requestData).toEqual({
    a: 1,
    b: 2,
  });

  act(() => {
    result.current.search({
      ...result.current.requestData,
      currentPage: 2,
      pageSize: 2,
    });
  });

  expect(result.current.requestData).toEqual({
    a: 1,
    b: 2,
    currentPage: 2,
    pageSize: 2,
  });

  await waitForNextUpdate();

  expect(result.current.responseData).toEqual({
    list: [
      {
        name: 'lily',
      },
      {
        name: 'jack',
      },
    ],
    total: 10,
  });
});
