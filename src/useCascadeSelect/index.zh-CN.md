---
nav:
  title: 流程组件
  path: /zh-CN/process-components
group:
  title: 流程组件
  path: /zh-CN/process-components
title: useCascadeSelect
order: 2
---

## 说明

当需要进行多个 Select 组件的级联选择，可使用这个流程组件。

## 示例

### 基础

修改 “喜欢” 的选项，会去请求所选 “喜欢” 对应的 “类型” 列表。

```jsx
import React, { useEffect } from 'react';
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
  const { selects, search } = useCascadeSelect({
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

  const { formProps, tableProps, form } = useFormTable({
    async search(values) {
      const res = await request(values);
      return {
        dataSource: res.list,
        total: res.total,
      };
    },
  });

  return (
    <div>
      <Form {...layout} {...formProps} style={{ width: 600 }}>
        <Form.Item label="用户名" name="username">
          <Input placeholder="用户名" />
        </Form.Item>

        <Form.Item label="喜欢" name="like">
          <Select {...like.props}>
            {like.options.map(item => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="类型" name="type">
          <Select {...type.props}>
            {type.options.map(item => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button onClick={() => form.resetFields()} style={{ marginRight: 8 }}>
            重置
          </Button>

          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>

      <Table
        style={{ marginTop: 12 }}
        bordered
        columns={[
          {
            title: '用户',
            dataIndex: 'username',
            key: 'username',
          },
          {
            title: '喜欢',
            dataIndex: 'like',
            key: 'like',
          },
          {
            title: '类型',
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
      <th>名称</th>
      <th>说明</th>
      <th>类型</th>
      <th width="200px">默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>list</td>
      <td>级联方法数组，之前的值返回后会作为之后的参数。</td>
      <td>name, options</td>
      <td>[]</td>
    </tr>
    <tr>
      <td>autoFirstSearch</td>
      <td>是否组件渲染就进行调用表单查询</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
  </tbody>
</table>

### Result

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>说明</th>
      <th>类型</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>selects</td>
      <td>级联对象，跟 list 长度相同，每一个对象有 props 及 options 属性</td>
      <td></td>
    </tr>
    <tr>
      <td>search</td>
      <td>对指定的级联 Select 进行搜索</td>
      <td>(index: number, value: string) => void</td>
    </tr>
  </tbody>
</table>
