# Sunflower

Sunflower is a library based on antd and react-hooks, it provides common business processes through hooks. In addition, sunflower provides a more convenient way to combine this process with antd ui components.

## ⚠️ Warning

This project is still under development.


## 🎩&nbsp; Features

- 🏄  Easy to use. You don't need to know too much about state and change methods to use components with interaction logic.
- 💅 Easy to customize. You can easily customize the combination of components you need.
- 👯 Layered design. You can use react-hooks without ui or react-hooks with antd.
- 🤾‍♂️Hooks return HOC. Crazy, but it does give you a more convenient api. At the same time you can choose not to use.

## 📟&nbsp; Usage

Install the react-hooks you need

```
$ npm install @sunflower-antd/form-table
```

#### hooks with antd
- @sunflower-antd/form-table
- @sunflower-antd/cascade-select

#### hooks without ui
- @sunflower-hooks/search-result
- @sunflower-hooks/cascade-search
- @sunflower-hooks/store

## 🤹‍♂️&nbsp; Examples

> An example that includes "Request", "Paging", and "Search" requires very little code.

![image](https://user-images.githubusercontent.com/44191223/60330155-65ad3280-99c4-11e9-9301-c96a3f28da31.png)


```jsx
import { Input, Button } from 'antd'; 
import { useFormTable } from '@sunflower-antd/form-table';

function Component() {
  const { Form, Table } = useFormTable({
    search: (values) => {
      return request('/api/user.json'); // 返回 {list,total} promise
  });
  return <div>
    <Form>
      <Form.Item
        label="Username"
        name="username"
      >
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
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        }
      ]}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
      }}
    />
  </div>;
}

ReactDOM.render(<Component />, mountNode);
```

> Want to customize?

```jsx
const { Form, responseData } = useFormTable({
   search: (values) => request(values),
});

return <div>
   
    <Form>
      ...
    </Form>
    
    {
      responseData.list.map(item => <div>
        {item.username}
      </div>)
    }
</div>
```


## ⚒&nbsp; Development

```
$ yarn
$ yarn bootstrap
$ yarn dev       // dev
$ yarn build     // build
$ yarn test      // test
```