import React, { useState } from 'react';
import { useCascadeSelect } from '@sunflower-antd/cascade-select';
import { useFormTable } from '@sunflower-antd/form-table';
import { Input, Button, Table, Select } from 'antd';


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
        if (value === 'lily') {
          return [{
            label: 'lily 1',
            value: 'lily 1',
          }, 
          {
            label: 'lily 2',
            value: 'lily 2',
          }];
        }
        return [{
          label: 'jack 1',
          value: 'jack 1',
        }, 
        {
          label: 'jack 2',
          value: 'jack 2',
        }];
      },
    ],
  });
  const [Select0, Select1] = selects;

  const { Form, form } = useFormTable({
    search: (values) => {},
  });

  return <div>

    <Form>
      <Form.Item
        label="Username"
        name="username"
      >
        <Select0
          style={{width: 200}}
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
        <Select1 style={{width: 200}} />
      </Form.Item>
    </Form>
    
  </div>
};
