import { useState, useEffect } from 'react';
import { Form } from 'antd';

declare type StoreBaseValue = string | number | boolean;
export declare type StoreValue = StoreBaseValue | Store | StoreBaseValue[];
export interface Store {
  [name: string]: StoreValue;
}

export interface UseFormConfig<T> {
  submit?: (formValues: T) => any;
  defaultFormValues?: Store | (() => (Promise<Store> | Store));
  form: any;
}

export const useForm = (config: UseFormConfig<Store>) => {
  const formConfig = config || {} as UseFormConfig<Store>;
  const {
    submit,
    defaultFormValues = {},
    form,
  } = formConfig;

  const [initialValues, setInitialValues] = useState();
  const [loading, setLoading] = useState(false);

  let version = 3;
  // antd4
  if (Form['useForm']) {
    version = 4;
  }

  let formInstance = form;
  if (!form) {
    if (version === 4) {
      [formInstance] = Form['useForm']();
    } else {
      throw new Error('"form" need in antd@3');
    }
  }

  useEffect(() => {
    let value: Store | Promise<Store>;
    if (typeof defaultFormValues === 'function') {
      value = defaultFormValues();
    } else {
      value = defaultFormValues;
    }

    Promise.resolve(value).then((data) => {
      if (version === 4) {
        setInitialValues(data);
      } else {
        form.setFieldsValue(data);
      }
    })
  }, [])


  const onFinish = async (values: Store) => {
    setLoading(true);
    await submit({ ...values });
    setLoading(false);
  };

  const formProps = version === 4 ? {
    form: formInstance,
    onFinish,
    initialValues,
  } : {
    onSubmit(e) {
      e.preventDefault();
      formInstance.validateFields(async (err, values) => {
        if (!err) {
          setLoading(true);
          await submit({ ...values });
          setLoading(false);
        }
      });
    },
  };

  return {
    form: formInstance,
    formProps,
    loading,
  };
};
