import { useState } from 'react';
import { useForm, UseFormConfig } from '@sunflower-antd/form';

export interface UseStepsFormConfig extends UseFormConfig {
  defaultCurrent?: number;
  total?: number;
}

export const useStepsForm = (config: UseStepsFormConfig) => {
  const {
    form,
    defaultFormValues,
    defaultCurrent = 0,
    submit,
    total,
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
    if (step === current) {
      return
    }

    // goto the target step after passing validate
    formInstance.validateFields(err => {
      if (!err) {
        let targetStep = step;

        if (step > total - 1) {
          targetStep = total - 1
        }

        if (step < 0) {
          targetStep = 0
        }

        setCurrent(targetStep)
      }
    });
  };

  const handleStepChange = currentStep => gotoStep(currentStep);

  return {
    current,
    gotoStep,
    stepsProps: {
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
