import { renderHook } from '@testing-library/react-hooks';
import { useFormTable } from '../src/useFormTable';

test('useFormTable', async () => {
  const search = jest.fn();
  const mockForm = {};
  const config = {
    form: mockForm,
    search: values => {
      search({
        ...values,
      });
      return {
        list: [
          {
            name: 'lily',
          },
          {
            name: 'jack',
          },
        ],
        total: 10,
      };
    },
    defaultFormValues: {
      username: 'lily',
    },
    autoFirstSearch: true,
  };
  const { result } = renderHook(() => useFormTable(config));
  const { formProps, tableProps, form } = result.current;
  expect(typeof formProps.onFinish).toBe('function');
  const props = { ...tableProps };
  delete props.onChange;
  expect(props).toEqual({
    pagination: {
      pageSize: 10,
      current: undefined,
      defaultPageSize: 10,
      defaultCurrent: 1,
      total: undefined,
    },
    loading: false,
    dataSource: undefined,
  });
  expect(form).toBe(mockForm);
});
