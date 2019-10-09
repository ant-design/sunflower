---
title: sunflower
---

# sunflower

React Hooks with components of [antd](https://ant.design).


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
$ yarn
$ yarn bootstrap
$ yarn dev       // dev
$ yarn build     // build
$ yarn test      // test
```
