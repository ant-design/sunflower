import { useState } from 'react';
import { useForm, UseFormConfig } from '@sunflower-antd/form';

export interface UseStepsFormConfig extends UseFormConfig {
  total?: number;
  defaultCurrent?: number;
}

export const useStepsForm = (config: UseStepsFormConfig) => {
  const {
    form,
    defaultFormValues,
    total,
    defaultCurrent,
    submit,
  } = config || {} as UseStepsFormConfig;
  const [current, setCurrent] = useState(defaultCurrent);

  const {
    form: formInstance,
    formProps,
    formLoading,
    defaultFormValuesLoading,
    formValues,
    initialValues,
    formResult,
    submit: formSubmit,
  } = useForm({
    form,
    submit,
    defaultFormValues,
  });

  const gotoStep = step => {
    if (Number(step) === current) {
      return
    }

    // goto the target step after passing validate
    formInstance.validateFields(err => {
      if (!err) {
        setCurrent(Number(step))
      }
    })
  };

  const handleStepChange = currentStep => gotoStep(currentStep);

  return {
    current,
    total,
    gotoStep,
    stepsProps: {
      initial: defaultCurrent,
      current,
      onChange: handleStepChange,
    },
    formProps,
    formLoading,
    defaultFormValuesLoading,
    formValues,
    initialValues,
    formResult,
    form: formInstance,
    submit: formSubmit,
  }
};
