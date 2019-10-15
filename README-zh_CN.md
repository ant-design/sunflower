<p align="center">
  <a href="https://ant-design.github.io/sunflower/">
    <img width="200" src="https://user-images.githubusercontent.com/26959437/65831129-bb0d1e80-e2e8-11e9-9c07-1f71c7dc7138.png">
  </a>
</p>

<h1 align="center">Sunflower</h1>

<div align="center">

[Ant Design](https://ant.design) 的 React Hook 组件库。

[![build status][circleci-image]][circleci-url] [![Test coverage][coveralls-image]][coveralls-url] [![node version][node-image]][node-url]

[circleci-image]: https://img.shields.io/circleci/build/github/ant-design/sunflower/master.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/ant-design/sunflower/tree/master
[coveralls-image]: https://img.shields.io/codecov/c/github/ant-design/sunflower/master.svg?style=flat-square
[coveralls-url]: https://codecov.io/gh/ant-design/sunflower
[node-image]: https://img.shields.io/badge/node.js-%3E=_6.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

</div>

[English](./README.md) | 简体中文


## 🎩 特性

- 🏄 上手简单：你不需要对状态和更改方法有深入的了解，就可以使用带有交互逻辑的组件。
- 💅 易于定制：你可以轻松地自定义所需要的组件的组合。
- 👯 分层化设计：你可以在不使用 UI 的情况下使用 React-Hooks，也可以将 React-Hooks 和 Ant Design 搭配使用。


## 🤔 初衷

通常，我们使用多个 antd 组件，并通过 state 和 props 方法（例如 `value`，`onChange`）来组织它们之间的关系。

有没有办法减少流程代码，并对多个 UI 组件之间的关系进行描述？我们如何通过一种方式来使用现有流程？

当然，React-Hooks 可以帮我们实现！我们可以将多个 antd 组件之间的关系通过 React-Hooks 描述出来。


## ⚠️ 警告

本项目仍在开发中。


## 📟 使用

```
$ npm install sunflower-antd --save
```


## 示例

### useFormTable

![image](https://user-images.githubusercontent.com/44191223/64115560-8b8af500-cdc2-11e9-99f0-191b2e9fc485.png)

```jsx
import { Form, Table } from 'antd';
import { useFormTable } from 'sunflower-antd';
import request from './request';


function Component({ form }) {
  // return: formProps, tableProps, current, pageSize, formValues ...
  const { formProps, tableProps } = useFormTable({
    // form instance from props
    form,    

    // default page size, default: 10
    defaultPageSize: 5,

    // search method, params: current, pageSize, fitlers, sorter and form values(eg: username)
    async search({ current, pageSize, username, email }) {
      const result = await request({ current, pageSize, username, email });

      // just return { dataSource, total }
      return {
        dataSource: result.list,
        total: result.total,
      };
    }
  });
  return <div>
    <Form layout="inline" {...formProps}>
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
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        }
      ]}
      rowKey="id"
      {...tableProps}
    />
  </div>;
}

export default Form.create()(Component);
```


## ⚒ Development

```
# 安装
$ yarn
$ yarn bootstrap

# 开发
$ yarn dev

# 构建
$ yarn build

# 测试
$ yarn test
```
