import React, { useEffect } from 'react';
import { Select, Form } from 'antd';
import { useCascadeSelect, useFormTable } from 'sunflower-antd';

const Option = Select.Option;


function CascadeSelect({ value, search, options, ...props }) {
  useEffect(() => {
    if (value && options) {
      search(value);
    }
  }, [value, options]);
  return <Select value={options && value} {...props}>
    {
      options.map(item => <Option value={item.value}>
        {item.label}
      </Option>)
    }
  </Select> 
}



export default Form.create()(props => {
  const { form } = props;
  const { selects, search } = useCascadeSelect({
    form,
    list: [
      {
        name: 'select0',
        async options() {
          await new Promise(r => setTimeout(r, 1000));
          return [{
            label: 'LILY',
            value: 'lily',
          }, {
            label: 'JACK',
            value: 'jack',
          }];
        }
      },
      {
        name: 'select1',
        async options(value) {
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
      }
    ],
  });
  const [select0, select1] = selects;

  const { formProps } = useFormTable({
    form,
    async defaultFormValues() {
      await new Promise(r => setTimeout(r, 200));
      return {
        select0: 'lily',
      };
    }
  });


  return <div>

    <Form {...formProps}>
      <Form.Item
        label="Select0"
      >
        {
          form.getFieldDecorator('select0')(
            <CascadeSelect
              allowClear
              loading={select0.props.loading}
              onChange={select0.props.onChange}
              options={select0.options}
              search={(val) => { search(1, val) }}
            />
          )
        } 
      </Form.Item>

      <Form.Item
        label="Select1"
      >
       {
          form.getFieldDecorator('select1')(
            <Select allowClear {...select1.props}>
              {
                select1.options.map(item => <Option key={item.key} value={item.value} >
                  {item.label}
                </Option>)
              }
            </Select>
          )
        } 
      </Form.Item>
    </Form>

  </div>;
});
