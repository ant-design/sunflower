---
nav:
  title: Process Components
  path: /process-components
group:
  title: Process Components
  path: /process-components
  order: 2
title: useCascadeSelect
---

## Overview

`useCascadeSelect` is a react-hooks. When you want to use cascading select, you can use it.

## Examples

### Basic

Change the "Like" select option, the "Type" select values ​​will change.

```jsx
import React from 'react';
import { Input, Select, Form, Button, Table } from 'antd';
import { useCascadeSelect, useFormTable } from 'sunflower-antd';
import Mock from 'mockjs'; // mock request

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default props => {
  const { formProps, tableProps, form } = useFormTable({
    async search(values) {
      const res = await request(values);
      return {
        dataSource: res.list,
        total: res.total,
      };
    },
  });

  const { selects } = useCascadeSelect({
    form,
    list: [
      {
        name: 'like',
        async options() {
          // mock
          await new Promise(r => setTimeout(r, 1000));
          return [
            {
              label: 'This is a Apple',
              value: 'apple',
            },
            {
              label: 'This is a Bananar',
              value: 'bananar',
            },
          ];
        },
      },
      {
        name: 'type',
        async options(value) {
          // mock
          await new Promise(r => setTimeout(r, 1000));

          if (value === 'apple') {
            return [
              {
                label: 'Red Apple',
                value: '1',
              },
              {
                label: 'Green Apple',
                value: '2',
              },
            ];
          }
          return [
            {
              label: 'Yellow Bananar',
              value: '1',
            },
            {
              label: 'Green Bananar',
              value: '2',
            },
          ];
        },
      },
    ],
  });
  const [like, type] = selects;

  return (
    <div>
      <Form {...layout} {...formProps} style={{ width: 600 }}>
        <Form.Item label="Username" name="username">
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item label="Like" name="like">
          <Select {...like.props} allowClear>
            {like.options.map(item => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select {...type.props} allowClear>
            {type.options.map(item => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button onClick={() => form.resetFields()} style={{ marginRight: 8 }}>
            Reset
          </Button>

          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <Table
        style={{ marginTop: 12 }}
        bordered
        columns={[
          {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
          },
          {
            title: 'Like',
            dataIndex: 'like',
            key: 'like',
          },
          {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
        ]}
        rowKey="id"
        {...tableProps}
      />
    </div>
  );
};

// mock request
const total = 200;
const db = Mock.mock({
  [`list|${total}`]: [
    {
      username: '@name',
      'like|1': ['apple', 'bananar'],
      'type|1': ['1', '2'],
    },
  ],
});
function filter(list, dataIndex, keyword) {
  if (!keyword) {
    return list;
  }
  return list.filter(
    item =>
      item[dataIndex].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) >
      -1,
  );
}
function request({ current, pageSize, like, type, username }) {
  const start = pageSize * (current - 1);
  const end = start + pageSize;
  let totalList = db.list;
  totalList = filter(totalList, 'username', username);
  totalList = filter(totalList, 'like', like);
  totalList = filter(totalList, 'type', type);
  const list = totalList.slice(start, end);
  return new Promise(r =>
    setTimeout(() => {
      r({
        list,
        total: totalList.length,
      });
    }, 300),
  );
}
```

### DefaultFormValues

## API

```js
const Result = useCascadeSelect(Config);
```

### Config

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
      <td>list</td>
      <td>Cascading method array. Each method returns a select list of options. When the previous select value change, the subsequent method will be triggered with previous select value.</td>
      <td>name, options</td>
      <td>[]</td>
    </tr>
    <tr>
      <td>autoFirstSearch</td>
      <td>Whether the first method in the list will be executed automatically.</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
  </tbody>
</table>

### Result

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
      <td>selects</td>
      <td>Cascade array, according to the length of the config list</td>
      <td></td>
    </tr>
    <tr>
      <td>search</td>
      <td>Execute the method of specifying the index in the config list,usually do not need to use.</td>
      <td>(index: number, value: string) => void</td>
    </tr>
  </tbody>
</table>
