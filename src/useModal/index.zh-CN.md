---
nav:
  title: 流程组件
  path: /zh-CN/process-components
group:
  title: 流程组件
  path: /zh-CN/process-components
title: useModal
order: 4
---## 说明

当你需要使用`antd Modal`，可使用 `useModal`。

## 示例

### 基础

```jsx
import React from 'react';
import { useModal } from 'sunflower-antd';
import { Modal, Input, Button, Form, message } from 'antd';

export default props => {
  const [form] = Form.useForm();
  const { modalProps, show, close } = useModal({
    defaultVisible: false,
  });
  const onSubmit = () => {
    form
      .validateFields()
      .then(async value => {
        await new Promise(r => setTimeout(r, 1000));
        form.resetFields();
        message.success('提交成功');
        close();
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <Modal
        {...modalProps}
        title="useModal"
        okText="submit"
        onOk={onSubmit}
        width={600}
      >
        <Form layout="inline" form={form}>
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
      </Modal>
      <Button onClick={show}>show</Button>
    </div>
  );
};
```

## API

```js
const result = useModal(config);
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
      <td>defaultVisible</td>
      <td>弹窗是否可见</td>
      <td>boolean</td>
      <td>false</td>
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
  </tbody>
</table>
