import { renderHook } from '@testing-library/react-hooks';
import { useForm } from '../packages/sunflower-antd/src';

test('useForm', async () => {
  const submit = jest.fn();
  const mockForm = {};
  const config = {
    form: mockForm,
    submit: (values) => {
      submit({
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
  };
  const { result } = renderHook(() =>
    useForm(config),
  );
  const { formProps, form } = result.current;
  expect(typeof formProps.onSubmit).toBe('function');
  expect(form).toBe(mockForm);
});
