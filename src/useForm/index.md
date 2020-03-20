---
nav:
  title: Process Components
  path: /process-components
group:
  title: Process Components
  path: /process-components
title: useForm
order: 5
---

## Overview

When you want to use `antd Form`, you can use it.

## Examples

### Basic

```jsx
import React from 'react';
import { useForm } from 'sunflower-antd';
import { Input, Button, Form, Spin } from 'antd';

export default props => {
  const [form] = Form.useForm();
  const { formProps, formValues, formResult, formLoading } = useForm({
    form,
    async submit({ username, email }) {
      console.log('submit');
      await new Promise(r => setTimeout(r, 1000));
      console.log('fewfew');
      return 'ok';
    },
  });
  return (
    <div>
      <p>
        submit: username {formValues.username} email {formValues.email}
      </p>
      <p>result: {formResult}</p>
      <p>formLoading: {formLoading && <Spin />}</p>
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

        <Form.Item>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
```

### defaultFormValues

```jsx
import React from 'react';
import { useForm } from 'sunflower-antd';
import { Input, Button, Form, Spin } from 'antd';

export default props => {
  const [form] = Form.useForm();
  const { formProps, formValues, formResult, formLoading } = useForm({
    form,
    async submit({ username, email }) {
      console.log('submit');
      await new Promise(r => setTimeout(r, 1000));
      console.log('fewfew');
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
      <p>
        submit: username {formValues.username} email {formValues.email}
      </p>
      <p>result: {formResult}</p>
      <p>formLoading: {formLoading && <Spin />}</p>
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

        <Form.Item>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
```

### submit method

```jsx
import React from 'react';
import { useForm } from 'sunflower-antd';
import { Input, Button, Form, Spin } from 'antd';

export default props => {
  const [form] = Form.useForm();
  const { formProps, formValues, formResult, formLoading, submit } = useForm({
    form,
    async submit({ username, email }) {
      console.log('submit', username, email);
      await new Promise(r => setTimeout(r, 1000));
      return 'ok';
    },
  });
  return (
    <div>
      <p>
        submit: username {formValues.username} email {formValues.email}
      </p>
      <p>result: {formResult}</p>
      <p>formLoading: {formLoading && <Spin />}</p>
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

        <Form.Item>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <Button
        onClick={() => submit({ username: 'lily' })}
        style={{ marginTop: 20 }}
        type="primary"
      >
        call submit method
      </Button>
    </div>
  );
};
```

## API

```js
const result = useForm(config);
```

### Config

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
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
