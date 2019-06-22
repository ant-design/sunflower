# sunflower

under development


> Sunflower  🌻 is an [antd](https://ant.design/) based process component library that uses react hooks.

Using sunflower allows developers to efficiently complete process and component development, and you don't need to know too many callback methods and states. At the same time, antd's ui features are also flexible.

## Examples


![image](https://user-images.githubusercontent.com/44191223/59961424-3e5cee00-950a-11e9-8b3a-0b7574b54e32.png)


Contains requests, paging, and more, requiring very little code.

```jsx
import { useSearchResult } from 'sunflower-search-table';

function Component() {
  const { Form, Table } = useSearchResult({
    search: (values) => request(values),
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
    />
  </div>;
}
```

## Development

```
$ yarn
$ yarn dev
```
