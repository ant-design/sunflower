import { renderHook, act } from '@testing-library/react-hooks';
import { useStepsForm } from '../src';

function excuteHook(defaultCurrent = 0) {
  const submit = jest.fn();
  const mockForm = {
    validateFields: cb => cb(),
  };
  const config = {
    form: mockForm,
    submit: values => {
      submit({
        ...values,
      });
    },
    defaultFormValues: {
      username: 'test',
    },
    defaultCurrent,
    total: 2,
  };
  const { result } = renderHook(() => useStepsForm(config));

  return result;
}

describe('useStepsForm', () => {
  test('base use', () => {
    const result = excuteHook();
    const {
      submit: formSubmit,
      current,
      gotoStep,
      stepsProps,
      formProps,
    } = result.current;
    expect(typeof formSubmit).toBe('function');
    expect(typeof stepsProps).toBe('object');
    expect(typeof formProps).toBe('object');
    expect(typeof stepsProps.onChange).toBe('function');
    expect(typeof gotoStep).toBe('function');
    expect(typeof current).toBe('number');
    expect(current).toBe(0);

    act(() => gotoStep(1));
    expect(result.current.current).toBe(1);
  });

  test('goto prev step', () => {
    const result = excuteHook(1);
    const { current, gotoStep } = result.current;
    expect(current).toBe(1);

    act(() => gotoStep(0));
    expect(result.current.current).toBe(0);
  });

  test('goto a step more than total', () => {
    const result = excuteHook();
    const { gotoStep } = result.current;

    act(() => gotoStep(3));
    expect(result.current.current).toBe(1);
  });

  test('goto current step', () => {
    const result = excuteHook(1);
    const { gotoStep } = result.current;

    act(() => gotoStep(1));
    expect(result.current.current).toBe(1);
  });

  test('goto a negative step', () => {
    const result = excuteHook();
    const { gotoStep } = result.current;

    act(() => gotoStep(-2));
    expect(result.current.current).toBe(0);
  });

  test('stepsProps onChange', () => {
    const result = excuteHook();
    const { stepsProps } = result.current;

    act(() => stepsProps.onChange(1));
    expect(result.current.current).toBe(1);
  });
});
