import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useFormTable } from '../packages/sunflower-antd-form-table/src';

test('useFormTable', async () => {
  const search = jest.fn();
  const config = {
    search: (values) => {
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
  const { result, waitForNextUpdate } = renderHook(() =>
    useFormTable(config),
  );
  const { Form, Table, form } = result.current;
  const onFinish = jest.fn();
  const { container: formContainer } = render(
    <Form onFinish={onFinish}>
      <Form.Item label="Username" name="username">
        <input />
      </Form.Item>
    </Form>,
  );
  expect(formContainer.firstChild.nodeName).toBe('FORM');
  const { container: tableContainer } = render(
    <Table />,
  );
  expect(tableContainer.firstChild.nodeName).toBe('DIV');
  expect(result.current.defaultFormValuesLoading).toEqual(true);
  await waitForNextUpdate();
  expect(result.current.currentPage).toEqual(undefined);
  await waitForNextUpdate();
  expect(result.current.currentPage).toEqual(1);
  expect(result.current.defaultFormValuesLoading).toEqual(false);
  expect(search).toBeCalledWith({
    username: 'lily',
    currentPage: 1,
    pageSize: 10,
  });
  form.submit();
  await new Promise(r => setTimeout(r, 200));
  expect(onFinish).toBeCalledWith({
    username: 'lily',
  });
});
