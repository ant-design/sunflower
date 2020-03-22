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
import { Steps, Input, Button, Form, Result, InputNumber } from 'antd';

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
    formValues,
  } = useStepsForm({
    async submit(values) {
      const { username, email, address } = values;
      await new Promise(r => setTimeout(r, 1000));
      return 'ok';
    },
    total: 3,
  });

  const formList = [
    <>
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
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button onClick={() => gotoStep(current + 1)}>Next</Button>
      </Form.Item>
    </>,

    <>
      <Form.Item label="Address" name="address">
        <Input />
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
          Submit
        </Button>
        <Button onClick={() => gotoStep(current - 1)}>Prev</Button>
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
            title="Submit is succeed!"
            extra={
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    form.resetFields();
                    gotoStep(0);
                  }}
                >
                  Buy it again
                </Button>
                <Button>Check detail</Button>
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
      <td>(step: number) =&gt; void</td>
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
