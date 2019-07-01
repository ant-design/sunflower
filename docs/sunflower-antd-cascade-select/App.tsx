import React, { useState } from 'react';
import { useCascadeSelect } from '@sunflower-antd/cascade-select';
import { useFormTable } from '@sunflower-antd/form-table';


export default () => {
  const { selects } = useCascadeSelect({
    list: [
      async () => {
        await new Promise(r => setTimeout(r, 1000));
        return [{
          label: 'lily',
          value: 'lily',
        }, {
          label: 'jack',
          value: 'jack',
        }];
      },
      async (value) => {
        await new Promise(r => setTimeout(r, 1000));
        return [{
          label: `${value} 1`,
          value: `${value} 1`,
        }, 
        {
          label: `${value} 2`,
          value: `${value} 2`,
        }];
      },
    ],
  });
  const [Select0, Select1] = selects;

  const { Form, form } = useFormTable({});

  return <div>

    <Form>
      <Form.Item
        label="Username"
        name="username"
      >
        <Select0
          onChange={() => {
            form.setFieldsValue({
              username2: '',
            });
          }}
        />
      </Form.Item>

      <Form.Item
        label="Username2"
        name="username2"
      >
        <Select1 />
      </Form.Item>
    </Form>
    
  </div>
};
