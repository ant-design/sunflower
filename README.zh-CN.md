# Sunflower

antd 流程组件

[![NPM version][npm-image]][npm-url]
[![build status][circleci-image]][circleci-url]

[circleci-image]: https://img.shields.io/circleci/build/github/ant-design/sunflower/master.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/ant-design/sunflower/tree/master
[npm-image]: https://img.shields.io/npm/v/sunflower-antd.svg?style=flat
[npm-url]: https://www.npmjs.com/package/sunflower-antd

[English](./README.md) | 简体中文

## 特定

- 支持 antd4, antd3
- 将 antd 组件间关系使用 react-hooks 来表述，使用流程组件的方式来简化开发
- 提炼于业务实际流程，拿来即用

## 为什么

通常，我们使用 antd 的多个组件来完成一个流程。比如想要完成一个 “使用 Form 搜索后 Table 来展示列表” 的功能，则需要去处理 “Form” 跟 “Table” 的关系，包括查询，分页等。

是否有个方式来简化组件间关系的维护？这就是 sunflower 的作用。能描述某个场景的 react-hooks，我们称之为 “流程组件”。sunflower 就是一系列基于 antd 的流程组件。

以下是一个 “Form & Table” 场景的示例，只需要以下的代码，就可完成包括查询，分页等功能。`useFormTable` 是一个 react-hooks，会返回 antd 组件的 props 等，将这些 props 给到 antd 组件即可完成组件间的联系。

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

  return (
    <div>
      <Form {...formProps}>
        <Form.Item label="用户名" name="username">
          <Input placeholder="用户名" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>

      <Table
        columns={[
          {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
          },
        ]}
        {...tableProps}
      />
    </div>
  );
};
```

## 快速开始

- [English](https://ant-design.github.io/sunflower/getting-started)
- [简体中文](https://ant-design.github.io/sunflower/zh-CN/getting-started)

## 使用

```
$ npm i sunflower-antd --save
// or
$ yarn add sunflower-antd
```

## 开发

```
$ yarn
$ yarn start
```
