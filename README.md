# sunflower

## 🌻&nbsp; What is Sunflower

&nbsp;&nbsp;&nbsp;&nbsp;[sunflower](https://ant-design.github.io/sunflower) is a library based on [react-hooks](https://reactjs.org/docs/hooks-intro.html) and [antd](https://ant.design), it provides common processes through hooks. In addition, sunflower provides a more convenient way to combine this process with antd ui components.

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

Install the react-hooks you need 

eg: `@sunflower-antd/form-table`
```
$ npm install @sunflower-antd/form-table --save
```

- [@sunflower-antd/cascade-select](https://ant-design.github.io/sunflower/docs-hooks-sunflower-antd-cascade-select)
- [@sunflower-antd/form-table](https://ant-design.github.io/sunflower/docs-hooks-sunflower-antd-form-table)


```jsx
import { useFormTable } from '@sunflower-antd/form-table';

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