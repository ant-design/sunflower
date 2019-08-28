import React from 'react';
import { useModal } from 'sunflower-antd';
import { Input, Button, Form } from 'antd';


export default Form.create()(props => {
  const { form } = props;
  const { modalProps, show, close } = useModal({
    defaultVisible: false,
  });
  const onSubmit = () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        await new Promise(r => setTimeout(r, 1000));
        close();
      }
    });
  }
  return (
    <div>
      <Modal
        {...modalProps}
        title="useModal"
        okText="submit"
        onOk={onSubmit}
      >
        <Form layout="inline">
          <Form.Item label="Username">
            {
              form.getFieldDecorator('username')(
                <Input placeholder="Username" />
              )
            } 
          </Form.Item>

          <Form.Item label="Email">
            {
              form.getFieldDecorator('email')(
                <Input placeholder="Email" />
              )
            } 
          </Form.Item>

          <Form.Item>
            <Button onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={show}>show</Button>
    </div>)
});
