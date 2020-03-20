---
nav:
  title: 流程组件
  path: /zh-CN/process-components
group:
  title: 流程组件
  path: /zh-CN/process-components
title: useForm
order: 5
---

## 说明

当你需要使用`antd Form`，可使用 `useForm`。

## 示例

### 基础

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
      <th>名称</th>
      <th>说明</th>
      <th>类型</th>
      <th width="200px">默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>submit</td>
      <td>请求方法, 其参数为 form fields 的值</td>
      <td>(formValues) => Promise&lt;formResult&gt; | formResult</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>在 antd4 中为 useForm 返回的 form 实例。在 antd3 中 Form.create() props.form</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>defaultFormValues</td>
      <td>默认的表单回填值，可为一个对象，也可为一个异步方法</td>
      <td>object | () => Promise&lt;object&gt;</td>
      <td></td>
    </tr>
  </tbody>
</table>

### Result

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>说明</th>
      <th>类型</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>formProps</td>
      <td>antd Form 组件的 props，作为 Form 组件的 props 即可</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>antd Form 的实例，可访问查看 <a href="https://ant.design/components/form-cn/#FormInstance" target="_blank">form 实例的方法</a></td>
      <td></td>
    </tr>
    <tr>
      <td>formLoading</td>
      <td>正在提交表单.</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>formValues</td>
      <td>对应 form fileds 的值</td>
      <td>object</td>
    </tr>
    <tr>
      <td>initialValues</td>
      <td>单默认值. 对应defaultFormValues</td>
      <td>object</td>
    </tr>
    <tr>
      <td>formResult</td>
      <td>submit返回值</td>
      <td></td>
    </tr>
    <tr>
      <td>defaultFormValuesLoading</td>
      <td>当使用 defaultFormValues 在请求表单回填值的 loading.</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>submit</td>
      <td>submit 方法. 可主动触发, 提交表单, 其参数为 form fields 的值</td>
      <td>(formValues) => Promise&lt;formResult&gt;</td>
    </tr>
  </tbody>
</table>
