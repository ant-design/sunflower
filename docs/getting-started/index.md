---
nav:
  title: Getting Started
  order: 1
title: Concept
---

Usually, we use multiple components of antd to complete a process. For example, if you want to complete the function of "using Table to display the list after Form search", you need to deal with the relationship between "Form" and "Table", including query, pagination, etc.

Is there a way to simplify the maintenance of relationships between components? This is what sunflower is for. React-hooks that describe a scene are called "Process Components". Sunflower is a series of antd-based "Process Components".

The following is an example of a "Form & Table" scenario. You only need the following code to complete functions such as querying and paging. `useFormTable` is a react-hooks, which will return the props of the antd component, etc. You can give these props to the antd component to complete the connection between the components.


```js
import React from 'react';
import { useFormTable } from 'sunflower-antd';
import { Input, Button, Table, Form } from 'antd';

export default props => {
  const { formProps, tableProps } = useFormTable({
    async search(values) {
      const res = await request(values);
      return res;
    },
  });

  return <div>
    <Form {...formProps}>
      <Form.Item label="Username" name="username">
        <Input placeholder="Username" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    
    </Form>

    <Table
      columns={[
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
      ]}
      {...tableProps}
    />
  </div>
};
```