import React from 'react';
import StateForm, { Field } from 'rc-field-form';
import { Form as AntdForm } from 'antd';


const Form = ({
  children,
  form,
  onFinish,
  initialValues,
  ...restProps
}) => <AntdForm {...restProps} onSubmit={event => {
  event.preventDefault();
  event.stopPropagation();
  form.validateFields().then(values => {
    if (onFinish) {
      onFinish(values);
    }
  })
  .catch(() => {});
}} >

<StateForm
  form={form}
  onFinish={onFinish}
  component={false}
  initialValues={initialValues}
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
      const props = {
        ...control,
        ...children.props,
        __sunflower: {
          form,
          name,
        },
      };
      const element =
        typeof children === 'function'
          ? children(control, meta, form)
          : children;
      // only modify when use onChange
      if (element.props.onChange) {
        props.onChange = (...args) => {
          control.onChange(...args);
          element.props.onChange(...args);
        };
      }
      const childNode = React.cloneElement(element, props);
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
