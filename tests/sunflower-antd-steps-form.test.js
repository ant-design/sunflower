import { renderHook } from '@testing-library/react-hooks';
import { useStepsForm } from '../packages/sunflower-antd/src';

test('useStepsForm', async () => {
  const submit = jest.fn();
  const mockForm = {};
  const config = {
    form: mockForm,
    submit: (values) => {
      submit({
        ...values,
      });
    },
    defaultFormValues: {
      username: 'test',
    },
    defaultCurrent: 1,
    total: 2,
  };
  const { result } = renderHook(() =>
    useStepsForm(config),
  );
  const { submit: formSubmit, form, current, gotoStep, stepsProps } = result.current;
  expect(typeof formSubmit).toBe('function');
  expect(typeof stepsProps.onChange).toBe('function');
  expect(typeof gotoStep).toBe('function');
  expect(typeof current).toBe('number');
  expect(form).toBe(mockForm);
});
