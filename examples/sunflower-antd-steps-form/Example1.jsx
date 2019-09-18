import React from 'react';
import { useStepsForm } from 'sunflower-antd';
import { Steps, Input, Button, Form } from 'antd';

const { Step } = Steps;

export default Form.create()(props => {
  const { form } = props;
  const {
    current,
    gotoStep,
    stepsProps,
    formProps,
    formValues,
    formResult,
    submit,
  } = useStepsForm({
    async submit({username, email}) {
      console.log('beforeSubmit');
      await new Promise(r => setTimeout(r, 1000));
      console.log('afterSubmit', username, email);
      return 'ok';
    },
    form,
  });

  const handleButtonClick = () => {
    // submit and goto next step
    submit().then(() => gotoStep(current + 1))
  };

  return (
    <div>
      <div>
        <p>current step is: {current}</p>
        <p>username is: {formValues.username || ''}, email is: {formValues.email || ''}</p>
        <p>submit result is: {formResult}</p>
      </div>
      <Steps {...stepsProps}>
        <Step title="first step" description="this is my first step" />
        <Step title="second step" />
      </Steps>
      {
        current === 0 && (
          <Form {...formProps}>
            <Form.Item label="Username">
              {
                form.getFieldDecorator('username', {
                  rules: [{
                    required: true,
                    message: 'Please input username'
                  }]
                })(
                  <Input placeholder="Username" />
                )
              }
            </Form.Item>
          </Form>
        )
      }
      {
        current === 1 && (
          <Form {...formProps}>
            <Form.Item label="Username">
              {
                form.getFieldDecorator('username', {
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
          </Form>
        )
      }
      <Button onClick={handleButtonClick}>提交</Button>
    </div>
  )
});
