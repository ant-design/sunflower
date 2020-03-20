import { renderHook } from '@testing-library/react-hooks';
import { useModalForm } from '../src/useModalForm';

test('useModalForm', async () => {
  const submit = jest.fn();
  const mockForm = {};
  const config = {
    form: mockForm,
    submit: values => {
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
    defaultVisible: false,
    autoSubmitClose: true,
  };
  const { result } = renderHook(() => useModalForm(config));
  const { formProps, modalProps, form } = result.current;
  expect(typeof formProps.onFinish).toBe('function');
  expect(typeof modalProps.onOk).toBe('function');
  expect(form).toBe(mockForm);
});
