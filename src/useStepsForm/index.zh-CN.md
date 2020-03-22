---
nav:
  title: 流程组件
  path: /zh-CN/process-components
group:
  title: 流程组件
  path: /zh-CN/process-components
title: useStepsForm
order: 4
---

## 说明

当你需要使用分步表单时，可使用 `useStepsForm`

## 示例

### 基础

```jsx
import React from 'react';
import { useStepsForm } from 'sunflower-antd';
import { Steps, Input, Button, Form, Result } from 'antd';

const { Step } = Steps;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default props => {
  const {
    form,
    current,
    gotoStep,
    stepsProps,
    formProps,
    submit,
    formLoading,
  } = useStepsForm({
    async submit(values) {
      const { username, email, address } = values;
      console.log(username, email, address);
      await new Promise(r => setTimeout(r, 1000));
      return 'ok';
    },
    total: 3,
  });

  const formList = [
    <>
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
      >
        <Input placeholder="用户" />
      </Form.Item>
      <Form.Item label="邮箱" name="email">
        <Input placeholder="邮箱" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button onClick={() => gotoStep(current + 1)}>下一步</Button>
      </Form.Item>
    </>,

    <>
      <Form.Item
        label="地址"
        name="address"
        rules={[
          {
            required: true,
            message: '请输入地址',
          },
        ]}
      >
        <Input placeholder="地址" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          style={{ marginRight: 10 }}
          type="primary"
          loading={formLoading}
          onClick={() => {
            submit().then(result => {
              if (result === 'ok') {
                gotoStep(current + 1);
              }
            });
          }}
        >
          提交
        </Button>
        <Button onClick={() => gotoStep(current - 1)}>上一步</Button>
      </Form.Item>
    </>,
  ];

  return (
    <div>
      <Steps {...stepsProps}>
        <Step title="First Step" />
        <Step title="Second Step" />
        <Step title="Success" />
      </Steps>

      <div style={{ marginTop: 60 }}>
        <Form {...layout} {...formProps} style={{ maxWidth: 600 }}>
          {formList[current]}
        </Form>

        {current === 2 && (
          <Result
            status="success"
            title="提交成功!"
            extra={
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    form.resetFields();
                    gotoStep(0);
                  }}
                >
                  再次购买
                </Button>
                <Button>查看详情</Button>
              </>
            }
          />
        )}
      </div>
    </div>
  );
};
```

## API

```js
const Result = useStepsForm(Config);
```

### Config

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
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
      <td>在 antd4 中为 `useForm` 返回的 `form` 实例。在 antd3 中 `Form.create()` 会自动注入 `props.form`</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>defaultFormValues</td>
      <td>默认的表单回填值，可为一个对象，也可为一个异步方法</td>
      <td>object</td>
      <td></td>
    </tr>
    <tr>
      <td>defaultCurrent</td>
      <td>默认开始的步骤，从 0 开始</td>
      <td>number</td>
      <td>0</td>
    </tr>
    <tr>
      <td>total</td>
      <td>分步表单的总步骤</td>
      <td>number</td>
      <td></td>
    </tr>
    <tr>
      <td>isBackValidate</td>
      <td>返回上一步时是否校验表单</td>
      <td>boolean</td>
      <td>true</td>
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
      <td>current</td>
      <td>当前步骤，从 0 开始</td>
      <td>number</td>
    </tr>
    <tr>
      <td>gotoStep</td>
      <td>切换到目标步骤，使用该方法时，将首先校验当前步骤的表单</td>
      <td dangerouslySetInnerHTML={{__html: '(step: number) => void'}}></td>
    </tr>
    <tr>
      <td>stepsProps</td>
      <td>antd Steps 组件的 props，作为 Steps 组件的 props 即可</td>
      <td>object</td>
    </tr>
    <tr>
      <td>formProps</td>
      <td>antd Form 组件的 props，作为 Form 组件的 props 即可</td>
      <td>object</td>
    </tr>
    <tr>
      <td>form</td>
      <td>Form 实例</td>
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
      <td>表单默认值. 对应 defaultFormValues</td>
      <td>object</td>
    </tr>
    <tr>
      <td>formResult</td>
      <td>submit 方法返回值</td>
      <td></td>
    </tr>
    <tr>
      <td>defaultFormValuesLoading</td>
      <td>当使用 defaultFormValues 在请求表单回填值的 loading</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>submit</td>
      <td>submit 方法. 可主动触发, 提交表单, 其参数为 form fields 的值</td>
      <td></td>
    </tr>
  </tbody>
</table>
