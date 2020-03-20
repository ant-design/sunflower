---
nav:
  title: 流程组件
  path: /zh-CN/process-components
group:
  title: 流程组件
  path: /zh-CN/process-components
  order: 3
title: useModalForm
---

## 说明

当你需要在关闭弹窗时自动提交表单，可使用 `useModalForm`。

## 示例

### 基础

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
      <th>名称</th>
      <th>说明</th>
      <th>Type</th>
      <th width="200px">类型</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>defaultVisible</td>
      <td>弹窗默认是否可见</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
     <tr>
      <td>autoSubmitClose</td>
      <td>点击确认, 提交表单后是否自动关闭弹窗</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>autoResetForm</td>
      <td>点击确认, 提交表单后是否重置initialValues</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
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
      <td>modalProps</td>
      <td>antd Modal 组件的 props，作为 Modal 组件的 props 即可</td>
      <td></td>
    </tr>
    <tr>
      <td>show</td>
      <td>打开弹窗</td>
      <td>() => void</td>
    </tr>
    <tr>
      <td>close</td>
      <td>关闭弹窗</td>
      <td>() => void</td>
    </tr>
    <tr>
      <td>visible</td>
      <td>弹窗当前显隐状态</td>
      <td>boolean</td>
    </tr>
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
      <td>正在提交表单</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>formValues</td>
      <td>对应 form fileds 的值</td>
      <td>object</td>
    </tr>
    <tr>
      <td>initialValues</td>
      <td>表单默认值. 对应defaultFormValues</td>
      <td>object</td>
    </tr>
    <tr>
      <td>formResult</td>
      <td>submit返回值</td>
      <td>any</td>
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
