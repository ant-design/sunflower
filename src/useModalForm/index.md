---
nav:
  title: Process Components
  path: /process-components
group:
  title: Process Components
  path: /process-components
title: useModalForm
order: 3
---

## Overview

When you want to use "Modal Form", you can use it.

## Examples

### Basic

```jsx
import React from 'react';
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin } from 'antd';

export default props => {
  const [form] = Form.useForm();
  const {
    modalProps,
    formProps,
    show,
    formLoading,
    formValues,
    formResult,
  } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    autoResetForm: true,
    async submit({ username, email }) {
      console.log('beforeSubmit');
      await new Promise(r => setTimeout(r, 1000));
      console.log('afterSubmit', username, email);
      return 'ok';
    },
    form,
  });
  return (
    <div>
      <Modal {...modalProps} title="useModalForm" okText="submit" width={600}>
        <Spin spinning={formLoading}>
          <>
            <p>
              submit: username {formValues.username} email {formValues.email}
            </p>
            <p>result: {formResult}</p>
            <Form layout="inline" {...formProps}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input username' }]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input email',
                    type: 'email',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Form>
          </>
        </Spin>
      </Modal>
      <Button onClick={show}>show</Button>
    </div>
  );
};
```

### DefaultFormValues

```jsx
import React from 'react';
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin } from 'antd';

export default props => {
  const [form] = Form.useForm();
  const {
    modalProps,
    formProps,
    show,
    formLoading,
    defaultFormValuesLoading,
  } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    form,
    async submit({ username, email }) {
      console.log('beforeSubmit');
      await new Promise(r => setTimeout(r, 1000));
      console.log('afterSubmit', `username:${username}, email:${email}`);
      return 'ok';
    },
    async defaultFormValues() {
      await new Promise(r => setTimeout(r, 3000));
      return {
        username: 'lily',
      };
    },
  });
  return (
    <div>
      <Modal {...modalProps} title="useModalForm" okText="submit" width={600}>
        <Spin spinning={formLoading || defaultFormValuesLoading}>
          <Form layout="inline" {...formProps}>
            <Form.Item label="Username" name="username">
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      <Button onClick={show}>show</Button>
    </div>
  );
};
```

### Submit method

```jsx
import React from 'react';
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin } from 'antd';

export default props => {
  const [form] = Form.useForm();
  const {
    modalProps,
    formProps,
    show,
    formLoading,
    submit: formSubmit,
  } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    async submit({ username, email }) {
      console.log('beforeSubmit');
      await new Promise(r => setTimeout(r, 1000));
      console.log('afterSubmit', username, email);
      return 'ok';
    },
    form,
  });
  return (
    <div>
      <Modal {...modalProps} title="useModalForm" okText="submit" width={600}>
        <Spin spinning={formLoading}>
          <Form layout="inline" {...formProps}>
            <Form.Item label="Username" name="username">
              <Input placeholder="Username" disabled />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input email',
                  type: 'email',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item>
              <Button
                onClick={() =>
                  formSubmit({ username: 'lily' }).then(data =>
                    console.log(data),
                  )
                }
                type="primary"
                style={{ marginTop: 20 }}
              >
                call submit method
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      <Button onClick={show}>show</Button>
    </div>
  );
};
```

### Default form submit

```jsx
import React from 'react';
import { useModalForm } from 'sunflower-antd';
import { Modal, Input, Button, Form, Spin } from 'antd';

export default props => {
  const [form] = Form.useForm();
  const {
    modalProps,
    formProps,
    show,
    formLoading,
    form: formInstance,
  } = useModalForm({
    defaultVisible: false,
    autoSubmitClose: true,
    async submit({ username, email }) {
      console.log('beforeSubmit');
      await new Promise(r => setTimeout(r, 1000));
      console.log('afterSubmit', username, email);
      return 'ok';
    },
    form,
  });
  return (
    <div>
      <Modal {...modalProps} title="useModalForm" okText="submit" width={740}>
        <Spin spinning={formLoading}>
          <Form layout="inline" {...formProps}>
            <Form.Item label="Username" name="username">
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input email',
                  type: 'email',
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item>
              <Button onClick={() => formInstance.resetFields()}>Reset</Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      <Button onClick={show}>show</Button>
    </div>
  );
};
```

## API

```js
const result = useModalForm(config);
```

### Config

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Description</th>
      <th>Type</th>
      <th width="200px">Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>defaultVisible</td>
      <td>Whether the modal dialog is visible or not</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
     <tr>
      <td>autoSubmitClose</td>
      <td>Click Modal "ok", will trigger submit, then close modal</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>autoResetForm</td>
      <td>Reset the specified fields' value(to initialValue) and status</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>submit</td>
      <td>submit method, the parameter is the value of the form fields</td>
      <td>(formValues) => Promise&lt;formResult&gt; | formResult</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>Decorated by Form.create() will be automatically set this.props.form property(antd3); useForm react hooks(antd4)</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>defaultFormValues</td>
      <td>Default form values.If the form has data that needs to be backfilled, use it to get the data.</td>
      <td>object | () => Promise&lt;object&gt;</td>
      <td></td>
    </tr>
  </tbody>
</table>

### Result

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>modalProps</td>
      <td>antd Modal props</td>
      <td></td>
    </tr>
    <tr>
      <td>show</td>
      <td>Specify a function that can open the modal</td>
      <td>() => void</td>
    </tr>
    <tr>
      <td>close</td>
      <td>Specify a function that can close the modal</td>
      <td>() => void</td>
    </tr>
    <tr>
      <td>visible</td>
      <td>Whether the modal dialog is visible or not</td>
      <td>boolean</td>
    </tr>
     <tr>
      <td>formProps</td>
      <td>antd Form props</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>Form instance</td>
      <td></td>
    </tr>
    <tr>
      <td>formLoading</td>
      <td>form request loading.</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>formValues</td>
      <td>form values</td>
      <td>object</td>
    </tr>
    <tr>
      <td>initialValues</td>
      <td>initial form values</td>
      <td>object</td>
    </tr>
    <tr>
      <td>formResult</td>
      <td>submit return value</td>
      <td></td>
    </tr>
    <tr>
      <td>defaultFormValuesLoading</td>
      <td>When use 'defaultFormValues', the value will be true during the request.</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>submit</td>
      <td>will call the 'submit' method</td>
      <td></td>
    </tr>
  </tbody>
</table>
