<p align="center">
  <a href="https://ant-design.github.io/sunflower/">
    <img width="200" src="https://user-images.githubusercontent.com/26959437/65831129-bb0d1e80-e2e8-11e9-9c07-1f71c7dc7138.png">
  </a>
</p>

<h1 align="center">Sunflower</h1>

<div align="center">

React Hooks with components of [antd](https://ant.design).

[![build status][circleci-image]][circleci-url] [![Test coverage][coveralls-image]][coveralls-url] [![node version][node-image]][node-url]

[circleci-image]: https://img.shields.io/circleci/build/github/ant-design/sunflower/master.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/ant-design/sunflower/tree/master
[coveralls-image]: https://img.shields.io/codecov/c/github/ant-design/sunflower/master.svg?style=flat-square
[coveralls-url]: https://codecov.io/gh/ant-design/sunflower
[node-image]: https://img.shields.io/badge/node.js-%3E=_6.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

</div>

English | [简体中文](./README-zh_CN.md)


## 🎩 Features

- 🏄 Easy to use. You don't need to know too much about state and change methods to use components with interaction logic.
- 💅 Easy to customize. You can easily customize the combination of components you need.
- 👯 Layered design. You can use react-hooks without ui or react-hooks with antd.


## 🤔 Why?

Usually, we use multiple antd components, and we organize their relationship through state and props methods like `value`, `onChange`.

Is there a way to reduce the process code and describe the relationship between multiple ui components? How can we use a way to use existing processes?

Yes,we can use react-hooks, so the relationship between multiple antd components will be in react-hooks.


## ⚠️ Warning

This project is still under development.


## 📟 Usage

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


## ⚒ Development

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
