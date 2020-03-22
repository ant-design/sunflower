import { useState } from 'react';
import { useForm, UseFormConfig } from '../useForm';

export interface UseStepsFormConfig extends UseFormConfig {
  defaultCurrent?: number;
  total?: number;
  isBackValidate?: boolean;
}

export const useStepsForm = (config: UseStepsFormConfig) => {
  const {
    form,
    defaultFormValues,
    defaultCurrent = 0,
    submit,
    total,
    isBackValidate = true,
  } = config || ({} as UseStepsFormConfig);
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

  const go = step => {
    let targetStep = step;

    if (step > total - 1) {
      targetStep = total - 1;
    }

    if (step < 0) {
      targetStep = 0;
    }

    setCurrent(targetStep);
  };

  const gotoStep = step => {
    if (step === current) {
      return true;
    }

    if (step < current && !isBackValidate) {
      go(step);
      return true;
    }

    // goto the target step after passing validate
    return formInstance.validateFields().then(values => {
      go(step);
      return values;
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
  };
};
