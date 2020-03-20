---
nav:
  title: Process Components
  path: /process-components
group:
  title: Process Components
  path: /process-components
title: useModal
order: 4
---

## Overview

When you want to use `antd Modal`, you can use it

## Examples

### Basic

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
      <th>Key</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>defaultVisible</td>
      <td>Whether the modal dialog is visible or not</td>
      <td>boolean</td>
      <td>false</td>
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
  </tbody>
</table>
