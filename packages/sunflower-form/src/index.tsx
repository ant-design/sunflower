import React from 'react';
import StateForm, { Field } from 'rc-field-form';
import { Form as AntdForm } from 'antd';


const Form = ({
  children,
  form,
  onFinish,
  ...restProps
}) => <AntdForm {...restProps} onSubmit={event => {
  event.preventDefault();
  event.stopPropagation();
  form.validateFields().then((values) => {
    if (onFinish) {
      onFinish(values);
    }
  })
  .catch(() => {});
}} >

<StateForm
  form={form}
  onFinish={onFinish}
  __COMPATIBILITY_USAGE_OR_YOU_WILL_BE_FIRED__={{
    NOT_CONTAIN_FORM: true,
    HOOK_MARK: 'asdihasiodhaohdioahfoihsoefhisihifhsiofhiosfd',
  }}
>
  {children}
   </StateForm>
</AntdForm>;

Form.Item = ({
  name,
  children,
  rules,
  ...restProps
}) => <Field name={name} rules={rules} {...restProps}>
    {(control, meta, form) => {
      const childNode =
        typeof children === 'function'
          ? children(control, meta, form)
          : React.cloneElement(children, { ...control });

      const validateStatus = meta.errors.length > 0 ? 'error' : undefined;
      const help = meta.errors.length > 0 ? meta.errors[0] : undefined;
      const required = !!((rules || []).find(item => item.required));
      return <AntdForm.Item
        help={help}
        validateStatus={validateStatus}
        required={required}
        {...restProps}
      >
        {childNode}
      </AntdForm.Item>;
    }}
</Field>;

export default Form;
