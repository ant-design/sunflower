import { renderHook } from '@testing-library/react-hooks';
import { useForm } from '../packages/sunflower-antd-form/src';

test('useForm', async () => {
  const mockForm = {};
  const config = {
    defaultFormValues: { username: 'Lily', email: '10164626@qq.com' },
    form: mockForm,
    async submit(values) {
      await new Promise(r => setTimeout(r, 1000));
    },
  };

  const { result } = renderHook(() =>
    useForm(config),
  );
  const { formProps, form, loading } = result.current;
  expect(typeof formProps.onSubmit).toBe('function');
  expect(typeof loading).toBe('boolean');
  const props = { ...formProps };
  delete props.onSubmit;
  expect(props).toEqual({});
  expect(form).toBe(mockForm);
});
