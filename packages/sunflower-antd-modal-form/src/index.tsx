import { useModal } from '@sunflower-antd/modal';
import { useForm, UseFormConfig } from '@sunflower-antd/form';

export interface UseModalFormConfig extends UseFormConfig{
  defaultVisible?: boolean;
  autoSubmitClose?: boolean;
}

export const useModalForm = (config: UseModalFormConfig) => {
  const modalFormConfig = config || {} as UseModalFormConfig;
  const {
    defaultVisible = false,
    autoSubmitClose = true,
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
      if (autoSubmitClose) {
        formInstance.validateFields((err, values) => {
          if (!err) {
            formSubmit({ ...values }).then((data) => {
              formInstance.resetFields();
              close();
            });
          }
        });
      }
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
