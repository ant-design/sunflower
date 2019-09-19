import React, { Fragment } from 'react';
import { useStepsForm } from 'sunflower-antd';
import { Steps, Input, Button, Form, Result, InputNumber, Descriptions } from 'antd';

const { Step } = Steps;
const fieldDecoratorOptions = {
  preserve: true,
}

export default Form.create()(props => {
  const { form } = props;
  const {
    current,
    gotoStep,
    stepsProps,
    formProps,
    submit,
  } = useStepsForm({
    async submit({username, email}) {
      console.log('beforeSubmit');
      await new Promise(r => setTimeout(r, 1000));
      console.log('afterSubmit', username, email);
      return 'ok';
    },
    form,
    total: 3,
  });

  const handleSubmit = () => {
    submit()
      .then(result => {
        if (result === 'ok') {
          gotoStep(current + 1)
        }
      })
  };

  return (
    <div>
      {
        current === 1 && (
          <Descriptions column={1}>
            <Descriptions.Item label="current step">{current}</Descriptions.Item>
            <Descriptions.Item label="Username">{form.getFieldValue('username')}</Descriptions.Item>
            <Descriptions.Item label="Email">{form.getFieldValue('email')}</Descriptions.Item>
          </Descriptions>
        )
      }
      <Steps {...stepsProps}>
        <Step title="First Step" description="Input your basic info" />
        <Step title="Second Step" />
        <Step title="Success" />
      </Steps>
      <Form {...formProps}>
        {
          current === 0 && (
            <Fragment>
              <Form.Item label="username">
                {
                  form.getFieldDecorator('username', {
                    ...fieldDecoratorOptions,
                    rules: [{
                      required: true,
                      message: 'Please input username'
                    }]
                  })(
                    <Input placeholder="Username" />
                  )
                }
              </Form.Item>
              <Form.Item label="Email">
                {
                  form.getFieldDecorator('email', {
                    ...fieldDecoratorOptions,
                    rules: [{
                      required: true,
                      message: 'Please input email',
                      type: 'email'
                    }]
                  })(
                    <Input placeholder="Email" />
                  )
                }
              </Form.Item>
            </Fragment>
          )
        }
        {
          current === 1 && (
            <Form.Item label="Price">
              {
                form.getFieldDecorator('price', {
                  ...fieldDecoratorOptions,
                  rules: [{
                    required: true,
                    message: 'Please input the price',
                    type: 'number',
                    max: 9999,
                    min: 0,
                  }]
                })(
                  <InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                )
              }
            </Form.Item>
          )
        }
      </Form>
      {
        current === 2 && (
          <Result
            status="success"
            title="Submit is succeed!"
            extra={(
              <Fragment>
                <Button type="primary" onClick={() => gotoStep(0)}>buy it again</Button>,
                <Button>check detail</Button>
              </Fragment>
            )}
          />
        )
      }
      {
        current < 1 && <Button onClick={() => gotoStep(current + 1)}>下一步</Button>
      }
      {
        current === 1 && (
          <Fragment>
            <Button style={{marginRight: 10}} type="primary" onClick={handleSubmit}>提交</Button>
            <Button onClick={() => gotoStep(current - 1)}>上一步</Button>
          </Fragment>
        )
      }
    </div>
  )
});
