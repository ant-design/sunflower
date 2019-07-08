import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useForm } from 'rc-field-form';
import Form from '../packages/sunflower-form/src';

test('Form', async () => {
  const onFinish = jest.fn();
  const onChange = jest.fn();
  const App = () => {
    const [form] = useForm();
    return <Form onFinish={onFinish} form={form} initialValues={initialValues}>
      <Form.Item label="Username" name="username" rules={[{ required: true }]}>
        <input aria-label="username" onChange={onChange} />
      </Form.Item>
      <Form.Item label="Username2" name="username2">
        {
          () => <input />
        }
      </Form.Item>
      <Form.Item>
        <button type="submit" aria-label="button">
          Search
        </button>
      </Form.Item>
    </Form>;
  };

  const initialValues = {
    username: 'lily',
    username2: 'jack',
  };
  const { container, getByLabelText } = render(<App />);
  expect(container.innerHTML.indexOf('lily') > 0).toBe(true);
  expect(container.innerHTML.indexOf('jack') > 0).toBe(true);
  const input = getByLabelText('username');
  fireEvent.change(input, { target: { value: '1' } });
  expect(onChange).toHaveBeenCalled();
  const button = getByLabelText('button');
  fireEvent.click(button);
  await new Promise(r => setTimeout(r, 200));
  expect(onFinish).toHaveBeenCalled();
});
