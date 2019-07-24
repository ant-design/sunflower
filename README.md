# sunflower

Collection of React Hooks returning components of [antd](https://ant.design).

[![build status][circleci-image]][circleci-url] [![Test coverage][coveralls-image]][coveralls-url] [![node version][node-image]][node-url]

[circleci-image]: https://img.shields.io/circleci/build/github/ant-design/sunflower/master.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/ant-design/sunflower/tree/master
[coveralls-image]: https://img.shields.io/codecov/c/github/ant-design/sunflower/master.svg?style=flat-square
[coveralls-url]: https://codecov.io/gh/ant-design/sunflower
[node-image]: https://img.shields.io/badge/node.js-%3E=_6.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/


## 🎩&nbsp; Features

- 🏄 Easy to use. You don't need to know too much about state and change methods to use components with interaction logic.
- 💅 Easy to customize. You can easily customize the combination of components you need.
- 👯 Layered design. You can use react-hooks without ui or react-hooks with antd.
- 🤾‍ Hooks return higher-order component (HOC). Crazy, but it does give you a more convenient api. At the same time you can choose not to use.

## 🤔&nbsp; Why?

&nbsp;&nbsp;&nbsp;&nbsp;Usually, we use multiple antd components, and we organize their relationship through state and props methods like `value`, `onChange`.

&nbsp;&nbsp;&nbsp;&nbsp;Is there a way to reduce the process code and describe the relationship between multiple ui components? How can we use a way to use existing processes?

&nbsp;&nbsp;&nbsp;&nbsp;Yes,we can use react-hooks, so the relationship between multiple antd components will be in react-hooks.Further, we use HOC as the api, so we don't have to care about the state and methods.


## ⚠️ Warning

This project is still under development.

## 📟&nbsp; Usage

```
$ npm install sunflower-antd --save
```


```jsx
import { useFormTable } from 'sunflower-antd';

function Component(props) {
  const { Form, Table } = useFormTable(config);
  return <div>
    <Form />
    <Table />
  </div>;
}

ReactDOM.render(<Component />, mountNode);
```


## ⚒&nbsp; Development

```
$ yarn
$ yarn bootstrap
$ yarn dev       // dev
$ yarn build     // build
$ yarn test      // test
```