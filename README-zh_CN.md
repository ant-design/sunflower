# Sunflower

一个基于 [Ant Design](https://ant.design) 的流程组件库。

[![NPM version][npm-image]][npm-url]
[![build status][circleci-image]][circleci-url]

[circleci-image]: https://img.shields.io/circleci/build/github/ant-design/sunflower/master.svg?style=flat-square
[circleci-url]: https://circleci.com/gh/ant-design/sunflower/tree/master
[npm-image]: https://img.shields.io/npm/v/sunflower-antd.svg?style=flat
[npm-url]: https://www.npmjs.com/package/sunflower-antd


[English](./README.md) | 简体中文


## 初衷

通常，我们使用多个 antd 组件，并通过 state 和 props 方法（例如 `value`，`onChange`）来组织它们之间的关系。

有没有办法减少流程代码，并对多个 UI 组件之间的关系进行描述？我们如何通过一种方式来使用现有流程？

当然，React-Hooks 可以帮我们实现！我们可以将多个 antd 组件之间的关系通过 React-Hooks 描述出来。

## 查看示例

https://ant-design.github.io/sunflower/readme-zh-cn

## 使用

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
