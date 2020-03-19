---
nav:
  title: 流程组件
title: useFormTable
---


## 说明

当你需要使用搜索列表这个场景，可使用 `useFormTable`。

## 示例

### 基础
```jsx
import React from 'react';
import { useFormTable } from 'sunflower-antd';
import { Input, Button, Table, Form } from 'antd';
import Mock from "mockjs"; // mock request


export default props => {
  const { formProps, tableProps, form } = useFormTable({
    async search(values) {
      const res = await request(values);
      return {
        dataSource: res.list,
        total: res.total,
      };
    },
    defaultPageSize: 5,
  });

  return <div>

    <Form layout="inline" {...formProps}>
      <Form.Item label="Username" name="username">
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
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
      style={{marginTop: 20}}
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
  </div>
};

// mock request
const total = 200;
const db = Mock.mock({
  [`list|${total}`]: [
    {
      username: "@name",
      email: "@email",
      id: "@guid",
      "gender|1": ["male", "female"] 
    }
  ]
});
function filter(list, dataIndex, keyword) {
  if (!keyword) {
    return list;
  }
  return list.filter(
    item =>
      item[dataIndex].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) >
      -1
  );
}
function request({ current, pageSize, filters, sorter, username, email }) {
  console.log('-------> request: username: %s, pageSize: %s, current: %s, filters: %s, sorter: %s', username, pageSize, current, JSON.stringify(filters), JSON.stringify(sorter));
  const start = pageSize * (current - 1);
  const end = start + pageSize;
  let totalList = db.list;
  totalList = filter(totalList, "username", username);
  totalList = filter(totalList, "email", email);
  if (filters) {
    Object.keys(filters).forEach(key => {
      if (!filters[key]) {
        return true;
      }
      if (filters[key].length === 0) {
        return true;
      }
      totalList = totalList.filter(item => filters[key].includes(item[key]));
    });
  }
  if (sorter && sorter.column) {
    const { dataIndex } = sorter.column;
    if (sorter.order === 'descend') {
      totalList = [...totalList].sort((a, b) => b[dataIndex].charCodeAt(0) - a[dataIndex].charCodeAt(0));
    } else {
      totalList = [...totalList].sort((a, b) => a[dataIndex].charCodeAt(0) - b[dataIndex].charCodeAt(0));
    }
  }
  const list = totalList.slice(start, end);
  return new Promise(r =>
    setTimeout(() => {
      r({
        list,
        total: totalList.length
      });
    }, 300)
  );
}
```

### 默认表单回填值

```jsx
import React from 'react';
import { useFormTable } from 'sunflower-antd';
import { Input, Button, Table, Form } from 'antd';
import Mock from "mockjs"; // mock request


export default props => {
  const { formProps, tableProps, form } = useFormTable({
    async search(values) {
      const res = await request(values);
      return {
        dataSource: res.list,
        total: res.total,
      };
    },
    async defaultFormValues() {
      await new Promise(r => setTimeout(r, 200));
      return {
        username: 'j',
      };
    },
  });

  return <div>

    <Form layout="inline" {...formProps}>
      <Form.Item label="Username" name="username">
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
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
      style={{marginTop: 20}}
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
  </div>
};

// mock request
const total = 200;
const db = Mock.mock({
  [`list|${total}`]: [
    {
      username: "@name",
      email: "@email",
      id: "@guid",
      "gender|1": ["male", "female"] 
    }
  ]
});
function filter(list, dataIndex, keyword) {
  if (!keyword) {
    return list;
  }
  return list.filter(
    item =>
      item[dataIndex].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) >
      -1
  );
}
function request({ current, pageSize, filters, sorter, username, email }) {
  console.log('-------> request: username: %s, pageSize: %s, current: %s, filters: %s, sorter: %s', username, pageSize, current, JSON.stringify(filters), JSON.stringify(sorter));
  const start = pageSize * (current - 1);
  const end = start + pageSize;
  let totalList = db.list;
  totalList = filter(totalList, "username", username);
  totalList = filter(totalList, "email", email);
  if (filters) {
    Object.keys(filters).forEach(key => {
      if (!filters[key]) {
        return true;
      }
      if (filters[key].length === 0) {
        return true;
      }
      totalList = totalList.filter(item => filters[key].includes(item[key]));
    });
  }
  if (sorter && sorter.column) {
    const { dataIndex } = sorter.column;
    if (sorter.order === 'descend') {
      totalList = [...totalList].sort((a, b) => b[dataIndex].charCodeAt(0) - a[dataIndex].charCodeAt(0));
    } else {
      totalList = [...totalList].sort((a, b) => a[dataIndex].charCodeAt(0) - b[dataIndex].charCodeAt(0));
    }
  }
  const list = totalList.slice(start, end);
  return new Promise(r =>
    setTimeout(() => {
      r({
        list,
        total: totalList.length
      });
    }, 300)
  );
}
```

### 过滤、排序

```jsx
import React from 'react';
import { useFormTable } from 'sunflower-antd';
import { Input, Button, Form, Table } from 'antd';
import Mock from "mockjs"; // mock request


export default props => {
  const { formProps, tableProps, sorter, filters, form } = useFormTable({
    async search(values) {
      const res = await request(values);
      return {
        dataSource: res.list,
        total: res.total,
      };
    },
  });

  return <div>
    <Form layout="inline" {...formProps}>
      <Form.Item label="Username" name="username">
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input placeholder="Email" />
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
      style={{marginTop: 20}}
      columns={[
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
          sorter: true,
          sortOrder: sorter && sorter.order,
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
          filters: [{
            text: 'male',
            value: 'male'
          }, {
            text: 'female',
            value: 'female'
          }],
          filterMultiple: false,
          filteredValue: filters && filters.gender || null,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        }
      ]}
      rowKey="id"
      {...tableProps}
      pagination={{
        ...tableProps.pagination,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
      }}
    />
  </div>
};


// mock request
const total = 200;
const db = Mock.mock({
  [`list|${total}`]: [
    {
      username: "@name",
      email: "@email",
      id: "@guid",
      "gender|1": ["male", "female"] 
    }
  ]
});
function filter(list, dataIndex, keyword) {
  if (!keyword) {
    return list;
  }
  return list.filter(
    item =>
      item[dataIndex].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) >
      -1
  );
}
function request({ current, pageSize, filters, sorter, username, email }) {
  console.log('-------> request: username: %s, pageSize: %s, current: %s, filters: %s, sorter: %s', username, pageSize, current, JSON.stringify(filters), JSON.stringify(sorter));
  const start = pageSize * (current - 1);
  const end = start + pageSize;
  let totalList = db.list;
  totalList = filter(totalList, "username", username);
  totalList = filter(totalList, "email", email);
  if (filters) {
    Object.keys(filters).forEach(key => {
      if (!filters[key]) {
        return true;
      }
      if (filters[key].length === 0) {
        return true;
      }
      totalList = totalList.filter(item => filters[key].includes(item[key]));
    });
  }
  if (sorter && sorter.column) {
    const { dataIndex } = sorter.column;
    if (sorter.order === 'descend') {
      totalList = [...totalList].sort((a, b) => b[dataIndex].charCodeAt(0) - a[dataIndex].charCodeAt(0));
    } else {
      totalList = [...totalList].sort((a, b) => a[dataIndex].charCodeAt(0) - b[dataIndex].charCodeAt(0));
    }
  }
  const list = totalList.slice(start, end);
  return new Promise(r =>
    setTimeout(() => {
      r({
        list,
        total: totalList.length
      });
    }, 300)
  );
}
```


## API


```js
const result = useFormTable(config);
```
### config

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>说明</th>
      <th>类型</th>
      <th width="200px">默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>search</td>
      <td>请求方法，其参数为 form fields 的值</td>
      <td>(requestData) => Promise&lt;responseData&gt; | responseData</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>可选。在 antd4 中为 useForm 返回的 form 实例。在 antd3 中 Form.create() props.form.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>autoFirstSearch</td>
      <td>是否组件渲染就进行调用表单查询</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>defaultPageSize</td>
      <td>默认的分页大小</td>
      <td>number</td>
      <td>10</td>
    </tr>
    <tr>
      <td>defaultCurrent</td>
      <td>默认的当前页</td>
      <td>number</td>
      <td>1</td>
    </tr>
    <tr>
      <td>defaultFormValues</td>
      <td>默认的表单回填值，可为一个对象，也可为一个异步方法。</td>
      <td>object | () => Promise&lt;object&gt;</td>
      <td></td>
    </tr>
  </tbody>
</table>

- responseData
```js
{
  list: [{
    name: 'jack',
  }, {
    name: 'lily',
  }],
  total: 10, 
}
```

- requestData
```js
search({ current, pageSize, filters, sorter, ...formValues }) {

}
```

### result

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>说明</th>
      <th>类型</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>formProps</td>
      <td>antd Form 组件的 props，作为 Form 组件的 props 即可</td>
      <td></td>
    </tr>
    <tr>
      <td>tableProps</td>
      <td>antd Table 组件的 props，作为 Table 组件的 props 即可</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>antd Form 的实例，可访问查看 <a href="https://ant.design/components/form-cn/#FormInstance" target="_blank">form 实例的方法</a></td>
      <td></td>
    </tr>
    <tr>
      <td>loading</td>
      <td>正在搜索</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>current</td>
      <td>当前第几页</td>
      <td>number</td>
    </tr>
    <tr>
      <td>pageSize</td>
      <td>分页大小</td>
      <td>number</td>
    </tr>
    <tr>
      <td>formValues</td>
      <td>对应 form fileds 的值</td>
      <td>object</td>
    </tr>
    <tr>
      <td>dataSource</td>
      <td>search 方法返回的 dataSource</td>
      <td>array</td>
    </tr>
    <tr>
      <td>total</td>
      <td>search 方法返回的 total</td>
      <td>number</td>
    </tr>
    <tr>
      <td>defaultFormValuesLoading</td>
      <td>当使用 defaultFormValues 在请求表单回填值的 loading</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>filters</td>
      <td>antd Table 组件的 filters</td>
      <td>object</td>
    </tr>
    <tr>
      <td>sorter</td>
      <td>antd Table 组件的 sorter</td>
      <td>object</td>
    </tr>
    <tr>
      <td>search</td>
      <td>search 方法，可主动触发，可传入自定义请求参数</td>
      <td>(customrequestData) => void</td>
    </tr>
  </tbody>
</table>