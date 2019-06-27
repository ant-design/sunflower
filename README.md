# sunflower (开发中)
 
Sunflower  🌻 是一套基于 antd 及 react-hooks 的业务流程库。sunflower 将常用的业务流程通过 hooks 提供出来，此外，sunflower 提供将这个流程跟 antd ui 组件组合起来，提供出更为方便的使用方式。

![image](https://user-images.githubusercontent.com/44191223/60277688-a196b800-9930-11e9-8905-0722ef9a03de.png)

## 特点

- 😆 采用 ”react-hooks“ 来沉淀业务中的流程，一个流程就是一个 hooks。
- 😁 提供 ”react-hooks + antd“ 的方式组合方式，使用申明式式的方式即可完成开发，不用配置 antd 的方法跟状态，只需要配置 antd 的 ui 属性即可。
- 😝 来源于业务，服务于业务。沉淀业务中常用的流程，让业务开发更高效。

更多可看 [《为什么有sunflower》](https://github.com/ant-design/sunflower/issues/1)

## 使用

```
$ npm install @sunflower-antd/form-table
```

## 示例


![image](https://user-images.githubusercontent.com/44191223/59961424-3e5cee00-950a-11e9-8b3a-0b7574b54e32.png)

一个包含了 ”请求“，”分页“，”查找“ 功能的示例仅需要很少的代码。

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
    />
  </div>;
}

ReactDOM.render(<Component />, mountNode);
```

想要自定义的而不是 sunflower 提供的组件？

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

> 这里的 Form 跟 Table 都是 antd 的，可用 antd 组件的属性，但是可不用去管方法跟状态（要是配置了会优先使用）。比如 Table 不需要手动去传 dataSource `<Table dataSource={dataSource} />`。不过 sunflower 也是优先使用用户的配置，如果配置了 dataSource，也会优先使用用户的。这样，用户只用去关注 antd 的 ui 配置即可，不用管理方法跟状态。


更多可见 [开发示例](https://github.com/ant-design/sunflower/blob/master/docs)


## 开发

```
$ yarn
$ yarn bootstrap
$ yarn dev       // dev
$ yarn build     // build
$ yarn test      // test
```