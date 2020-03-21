---
nav:
  title: Process Components
  path: /process-components
group:
  title: Process Components
  path: /process-components
title: useStepsForm
order: 4
---

## Overview

`useStepsForm` is a react-hook. When you want to use "Steps Form", you can use it.

## Examples

### Basic

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

```js
const obj = useStepsForm(config);
```

- config

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
      <td dangerouslySetInnerHTML={{__html: '(formValues) => Promise<formResult> | formResult'}}></td>
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
      <td>object</td>
      <td dangerouslySetInnerHTML={{__html: '{}'}}></td>
    </tr>
    <tr>
      <td>defaultCurrent</td>
      <td>Default step, counting from 0.</td>
      <td>number</td>
      <td dangerouslySetInnerHTML={{__html: '0'}}></td>
    </tr>
    <tr>
      <td>total</td>
      <td>total counting for steps.</td>
      <td>number</td>
      <td></td>
    </tr>
    <tr>
      <td>isBackValidate</td>
      <td>should validate if go to prev step</td>
      <td>boolean</td>
      <td dangerouslySetInnerHTML={{__html: 'true'}}></td>
    </tr>
  </tbody>
</table>

- obj

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
      <td>current</td>
      <td>current step, counting from 0.</td>
      <td>number</td>
    </tr>
    <tr>
      <td>gotoStep</td>
      <td>goto the target step. When use it, the hook will validate current form at first.</td>
      <td dangerouslySetInnerHTML={{__html: '(step: number) => void'}}></td>
    </tr>
    <tr>
      <td>stepsProps</td>
      <td>antd Steps props</td>
      <td>object</td>
    </tr>
    <tr>
      <td>formProps</td>
      <td>antd Form props</td>
      <td>object</td>
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
