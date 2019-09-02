# sunflower

React Hooks with components of [antd](https://ant.design).

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

## 🤔&nbsp; Why?

&nbsp;&nbsp;&nbsp;&nbsp;Usually, we use multiple antd components, and we organize their relationship through state and props methods like `value`, `onChange`.

&nbsp;&nbsp;&nbsp;&nbsp;Is there a way to reduce the process code and describe the relationship between multiple ui components? How can we use a way to use existing processes?

&nbsp;&nbsp;&nbsp;&nbsp;Yes,we can use react-hooks, so the relationship between multiple antd components will be in react-hooks.


## ⚠️ Warning

This project is still under development.

## 📟&nbsp; Usage

```
$ npm install sunflower-antd --save
```


## Examples

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


## ⚒&nbsp; Development

```
$ yarn
$ yarn bootstrap
$ yarn dev       // dev
$ yarn build     // build
$ yarn test      // test
```