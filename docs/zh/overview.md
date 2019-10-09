---
title: Sunflower
---

# Sunflower

[Ant Design](https://ant.design) 的 React Hook 组件库。


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


## ⚒ 开发

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
