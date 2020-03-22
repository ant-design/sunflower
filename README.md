# Sunflower

Process Components for antd.

[![NPM version][npm-image]][npm-url]
[![build status][circleci-image]][circleci-url]

[circleci-image]: https://img.shields.io/circleci/build/github/ant-design/sunflower/master.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/ant-design/sunflower/tree/master
[npm-image]: https://img.shields.io/npm/v/sunflower-antd.svg?style=flat
[npm-url]: https://www.npmjs.com/package/sunflower-antd

English | [简体中文](./README.zh-CN.md)

## Features

- Support antd4, antd3
- The relationship between antd components is expressed using react-hooks, and process components are used to simplify development
- Process Components are extracted from the actual business processes and used immediately

## Why

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

  return (
    <div>
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
  );
};
```

## Document

- [English](https://ant-design.github.io/sunflower/getting-started)
- [简体中文](https://ant-design.github.io/sunflower/zh-CN/getting-started)

## Usage

```
$ npm i sunflower-antd --save
// or
$ yarn add sunflower-antd
```

## Development

```
$ yarn
$ yarn start
```
