# Sunflower

React Hooks with [antd](https://ant.design).

[![NPM version][npm-image]][npm-url]
[![build status][circleci-image]][circleci-url]

[circleci-image]: https://img.shields.io/circleci/build/github/ant-design/sunflower/master.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/ant-design/sunflower/tree/master
[npm-image]: https://img.shields.io/npm/v/sunflower-antd.svg?style=flat
[npm-url]: https://www.npmjs.com/package/sunflower-antd

English | [简体中文](./README-zh_CN.md)


## Why?

Usually, we use multiple antd components, and we organize their relationship through state and props methods like `value`, `onChange`.

Is there a way to reduce the process code and describe the relationship between multiple ui components? How can we use a way to use existing processes?

Yes,we can use react-hooks, so the relationship between multiple antd components will be in react-hooks.


## Demo

https://ant-design.github.io/sunflower/

## Usage

```
$ npm install sunflower-antd --save
```

```jsx
import { Form, Table } from 'antd';
import { useFormTable } from 'sunflower-antd';

function Component(props) {
  const { formProps, tableProps } = useFormTable(config);
  return <div>
    <Form {...formProps} />
    <Table {...tableProps} />
  </div>;
}

ReactDOM.render(<Component />, mountNode);
```


## Development

```
# install
$ yarn
$ yarn bootstrap

# dev
$ yarn dev

# build
$ yarn build

# test
$ yarn test
```
