import { useModal } from '@sunflower-antd/modal';
import { useForm, UseFormConfig } from '@sunflower-antd/form';

export interface UseModalFormConfig extends UseFormConfig{
  defaultVisible?: boolean;
  autoSubmitClose?: boolean;
  autoResetForm?: boolean;
}

export const useModalForm = (config: UseModalFormConfig) => {
  const modalFormConfig = config || {} as UseModalFormConfig;
  const {
    defaultVisible = false,
    autoSubmitClose = true,
    autoResetForm = true,
    submit,
    form,
    defaultFormValues,
  } = modalFormConfig;


  const {
    visible,
    show,
    close,
    modalProps,
  } = useModal({
    defaultVisible,
  });

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
  })


  const modalFormProps = {
    ...modalProps,
    onOk: () => {
      formSubmit().then(() => {
        if (autoSubmitClose) {
          close();
        }

        if (autoResetForm) {
          formInstance.resetFields();
        }
      });
    },
  }

  return {
    form: formInstance,
    visible,
    show,
    close,
    modalProps: modalFormProps,
    formProps,
    formLoading,
    defaultFormValuesLoading,
    formValues,
    initialValues,
    formResult,
    submit: formSubmit,
  };
};
