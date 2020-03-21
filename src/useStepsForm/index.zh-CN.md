---
nav:
  title: 流程组件
  path: /process-components
group:
  title: 流程组件
  path: /process-components
title: useStepsForm
order: 4
---

## 说明

当你需要使用分步表单时，可使用 `useStepsForm`

## 示例

### 基础

```jsx
import React, { Fragment } from 'react';
import { useStepsForm } from 'sunflower-antd';
import {
  Steps,
  Input,
  Button,
  Form,
  Result,
  InputNumber,
  Descriptions,
} from 'antd';

const { Step } = Steps;

export default props => {
  const [form] = Form.useForm();
  const { current, gotoStep, stepsProps, formProps, submit } = useStepsForm({
    async submit({ username, email }) {
      console.log('beforeSubmit');
      await new Promise(r => setTimeout(r, 1000));
      console.log('afterSubmit', username, email);
      return 'ok';
    },
    form,
    total: 3,
  });

  const handleSubmit = () => {
    submit().then(result => {
      if (result === 'ok') {
        gotoStep(current + 1);
      }
    });
  };

  return (
    <div>
      {current === 1 && (
        <Descriptions column={1}>
          <Descriptions.Item label="current step">{current}</Descriptions.Item>
          <Descriptions.Item label="Username">
            {form.getFieldValue('username')}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {form.getFieldValue('email')}
          </Descriptions.Item>
        </Descriptions>
      )}
      <Steps {...stepsProps}>
        <Step title="First Step" description="Input your basic info" />
        <Step title="Second Step" />
        <Step title="Success" />
      </Steps>
      <Form {...formProps}>
        {current === 0 && (
          <Fragment>
            <Form.Item
              label="username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input username',
                },
              ]}
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
          </Fragment>
        )}
        {current === 1 && (
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input the price',
                type: 'number',
                max: 9999,
                min: 0,
              },
            ]}
          >
            <InputNumber
              formatter={value =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        )}
      </Form>
      {current === 2 && (
        <Result
          status="success"
          title="Submit is succeed!"
          extra={
            <Fragment>
              <Button type="primary" onClick={() => gotoStep(0)}>
                buy it again
              </Button>
              ,<Button>check detail</Button>
            </Fragment>
          }
        />
      )}
      {current < 1 && (
        <Button onClick={() => gotoStep(current + 1)}>下一步</Button>
      )}
      {current === 1 && (
        <Fragment>
          <Button
            style={{ marginRight: 10 }}
            type="primary"
            onClick={handleSubmit}
          >
            提交
          </Button>
          <Button onClick={() => gotoStep(current - 1)}>上一步</Button>
        </Fragment>
      )}
    </div>
  );
};
```

## API

```jsx
const obj = useStepsForm(config);
```

- config

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
      <td dangerouslySetInnerHTML={{__html: '(formValues) => Promise<formResult> | formResult'}}></td>
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
      <td dangerouslySetInnerHTML={{__html: '{}'}}></td>
    </tr>
    <tr>
      <td>defaultCurrent</td>
      <td>默认开始的步骤，从 0 开始</td>
      <td>number</td>
      <td dangerouslySetInnerHTML={{__html: '0'}}></td>
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
      <td dangerouslySetInnerHTML={{__html: 'true'}}></td>
    </tr>
  </tbody>
</table>

- obj

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
