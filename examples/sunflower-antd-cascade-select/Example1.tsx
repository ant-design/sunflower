import React from 'react';
import { useCascadeSelect } from '@sunflower-antd/cascade-select';
import { useFormTable } from '@sunflower-antd/form-table';


export default () => {
  const { selects } = useCascadeSelect({
    list: [
      async () => {
        await new Promise(r => setTimeout(r, 1000));
        return [{
          label: 'LILY',
          value: 'lily',
        }, {
          label: 'JACK',
          value: 'jack',
        }];
      },
      async (value) => {
        await new Promise(r => setTimeout(r, 1000));
        return [{
          label: `${value.toUpperCase()} 1`,
          value: `${value} 1`,
        },
        {
          label: `${value.toUpperCase()} 2`,
          value: `${value} 2`,
        }];
      },
      async (value) => {
        await new Promise(r => setTimeout(r, 1000));
        return [{
          label: `${value.toUpperCase()} 1`,
          value: `${value} 1`,
        },
        {
          label: `${value} 2`,
          value: `${value} 2`,
        }];
      },
    ],
  });
  const [Select0, Select1, Select2] = selects;

  const { Form } = useFormTable({
    async defaultFormValues() {
      await new Promise(r => setTimeout(r, 200));
      return {
        select0: 'lily'
      }
    }
  });

  return <div>

    <Form>
      <Form.Item
        label="Select0"
        name="select0"
      >
        <Select0 />
      </Form.Item>

      <Form.Item
        label="Select1"
        name="select1"
      >
        <Select1 />
      </Form.Item>

      <Form.Item
        label="Select0"
        name="select2"
      >
        <Select2 />
      </Form.Item>
    </Form>

  </div>;
};
