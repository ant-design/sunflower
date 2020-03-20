---
nav:
  title: Process Components
  path: /process-components
group:
  title: Process Components
  path: /process-components
title: useFormTable
order: 1
---

## Overview1

When you want to use "Form Search Table", you can use it.

## Examples

### Basic

```jsx
import React from 'react';
import { useFormTable } from 'sunflower-antd';
import { Input, Button, Table, Form } from 'antd';
import Mock from 'mockjs'; // mock request

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

  return (
    <div>
      <Form layout="inline" {...formProps}>
        <Form.Item label="Username" name="username">
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <Table
        style={{ marginTop: 20 }}
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
          },
        ]}
        rowKey="id"
        {...tableProps}
      />
    </div>
  );
};

// mock request
const total = 200;
const db = Mock.mock({
  [`list|${total}`]: [
    {
      username: '@name',
      email: '@email',
      id: '@guid',
      'gender|1': ['male', 'female'],
    },
  ],
});
function filter(list, dataIndex, keyword) {
  if (!keyword) {
    return list;
  }
  return list.filter(
    item =>
      item[dataIndex].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) >
      -1,
  );
}
function request({ current, pageSize, filters, sorter, username, email }) {
  console.log(
    '-------> request: username: %s, pageSize: %s, current: %s, filters: %s, sorter: %s',
    username,
    pageSize,
    current,
    JSON.stringify(filters),
    JSON.stringify(sorter),
  );
  const start = pageSize * (current - 1);
  const end = start + pageSize;
  let totalList = db.list;
  totalList = filter(totalList, 'username', username);
  totalList = filter(totalList, 'email', email);
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
      totalList = [...totalList].sort(
        (a, b) => b[dataIndex].charCodeAt(0) - a[dataIndex].charCodeAt(0),
      );
    } else {
      totalList = [...totalList].sort(
        (a, b) => a[dataIndex].charCodeAt(0) - b[dataIndex].charCodeAt(0),
      );
    }
  }
  const list = totalList.slice(start, end);
  return new Promise(r =>
    setTimeout(() => {
      r({
        list,
        total: totalList.length,
      });
    }, 300),
  );
}
```

### DefaultFormValues

```jsx
import React from 'react';
import { useFormTable } from 'sunflower-antd';
import { Input, Button, Table, Form } from 'antd';
import Mock from 'mockjs'; // mock request

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

  return (
    <div>
      <Form layout="inline" {...formProps}>
        <Form.Item label="Username" name="username">
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <Table
        style={{ marginTop: 20 }}
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
          },
        ]}
        rowKey="id"
        {...tableProps}
      />
    </div>
  );
};

// mock request
const total = 200;
const db = Mock.mock({
  [`list|${total}`]: [
    {
      username: '@name',
      email: '@email',
      id: '@guid',
      'gender|1': ['male', 'female'],
    },
  ],
});
function filter(list, dataIndex, keyword) {
  if (!keyword) {
    return list;
  }
  return list.filter(
    item =>
      item[dataIndex].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) >
      -1,
  );
}
function request({ current, pageSize, filters, sorter, username, email }) {
  console.log(
    '-------> request: username: %s, pageSize: %s, current: %s, filters: %s, sorter: %s',
    username,
    pageSize,
    current,
    JSON.stringify(filters),
    JSON.stringify(sorter),
  );
  const start = pageSize * (current - 1);
  const end = start + pageSize;
  let totalList = db.list;
  totalList = filter(totalList, 'username', username);
  totalList = filter(totalList, 'email', email);
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
      totalList = [...totalList].sort(
        (a, b) => b[dataIndex].charCodeAt(0) - a[dataIndex].charCodeAt(0),
      );
    } else {
      totalList = [...totalList].sort(
        (a, b) => a[dataIndex].charCodeAt(0) - b[dataIndex].charCodeAt(0),
      );
    }
  }
  const list = totalList.slice(start, end);
  return new Promise(r =>
    setTimeout(() => {
      r({
        list,
        total: totalList.length,
      });
    }, 300),
  );
}
```

### Filters & Sorter

```jsx
import React from 'react';
import { useFormTable } from 'sunflower-antd';
import { Input, Button, Form, Table } from 'antd';
import Mock from 'mockjs'; // mock request

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

  return (
    <div>
      <Form layout="inline" {...formProps}>
        <Form.Item label="Username" name="username">
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <Table
        style={{ marginTop: 20 }}
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
            filters: [
              {
                text: 'male',
                value: 'male',
              },
              {
                text: 'female',
                value: 'female',
              },
            ],
            filterMultiple: false,
            filteredValue: (filters && filters.gender) || null,
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
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
  );
};

// mock request
const total = 200;
const db = Mock.mock({
  [`list|${total}`]: [
    {
      username: '@name',
      email: '@email',
      id: '@guid',
      'gender|1': ['male', 'female'],
    },
  ],
});
function filter(list, dataIndex, keyword) {
  if (!keyword) {
    return list;
  }
  return list.filter(
    item =>
      item[dataIndex].toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) >
      -1,
  );
}
function request({ current, pageSize, filters, sorter, username, email }) {
  console.log(
    '-------> request: username: %s, pageSize: %s, current: %s, filters: %s, sorter: %s',
    username,
    pageSize,
    current,
    JSON.stringify(filters),
    JSON.stringify(sorter),
  );
  const start = pageSize * (current - 1);
  const end = start + pageSize;
  let totalList = db.list;
  totalList = filter(totalList, 'username', username);
  totalList = filter(totalList, 'email', email);
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
      totalList = [...totalList].sort(
        (a, b) => b[dataIndex].charCodeAt(0) - a[dataIndex].charCodeAt(0),
      );
    } else {
      totalList = [...totalList].sort(
        (a, b) => a[dataIndex].charCodeAt(0) - b[dataIndex].charCodeAt(0),
      );
    }
  }
  const list = totalList.slice(start, end);
  return new Promise(r =>
    setTimeout(() => {
      r({
        list,
        total: totalList.length,
      });
    }, 300),
  );
}
```

## API

```js
const result = useFormTable(config);
```

### Config

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>search</td>
      <td>Request method, the parameter is the value of the form fields.The method needs to return an array or Promise of SearchResponseData.</td>
      <td>(requestData) => Promise&lt;responseData&gt; | responseData</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>Optional, decorated by useForm in antd4(Form.create() in antd3)</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>autoFirstSearch</td>
      <td>Whether the search method will be executed automatically.</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>defaultPageSize</td>
      <td>Default page size</td>
      <td>number</td>
      <td>10</td>
    </tr>
    <tr>
      <td>defaultCurrent</td>
      <td>Default current page</td>
      <td>number</td>
      <td>1</td>
    </tr>
    <tr>
      <td>defaultFormValues</td>
      <td>Default form values.If the form has data that needs to be backfilled, use it to get the data.</td>
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

### Result

<table>
  <thead>
    <tr>
      <th>Key</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>formProps</td>
      <td>antd Form props</td>
      <td></td>
    </tr>
    <tr>
      <td>tableProps</td>
      <td>antd Table props</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>Form instance</td>
      <td></td>
    </tr>
    <tr>
      <td>loading</td>
      <td>Request loading.</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>current</td>
      <td>Current page.</td>
      <td>number</td>
    </tr>
    <tr>
      <td>pageSize</td>
      <td>Page size.</td>
      <td>number</td>
    </tr>
    <tr>
      <td>formValues</td>
      <td>Form values.</td>
      <td>object</td>
    </tr>
    <tr>
      <td>dataSource</td>
      <td>The value's 'dataSource prop' returned by the search method.</td>
      <td>array</td>
    </tr>
    <tr>
      <td>total</td>
      <td>The value's 'total prop' returned by the search method.</td>
      <td>number</td>
    </tr>
    <tr>
      <td>defaultFormValuesLoading</td>
      <td>When use 'defaultFormValues', the value will be true during the request.</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>filters</td>
      <td>antd Table filters</td>
      <td>object</td>
    </tr>
    <tr>
      <td>sorter</td>
      <td>antd Table sorter</td>
      <td>object</td>
    </tr>
    <tr>
      <td>search</td>
      <td>will call the 'search' method with custom request data</td>
      <td>(customRequestData) => void</td>
    </tr>
  </tbody>
</table>
