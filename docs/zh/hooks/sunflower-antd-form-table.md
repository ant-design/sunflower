---
title: useFormTable
---

# useFormTable


## Overview

`useFormTable` 是一个 React Hook。当你想要使用 "Form Search Table" 的时候，你可以使用它。


## 示例

默认形式：

<iframe src="https://codesandbox.io/embed/useformtableexample1-t6e6v?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

带过滤和排序功能：

<iframe src="https://codesandbox.io/embed/useformtableexample2-izvwq?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

带有默认表单值：

<iframe src="https://codesandbox.io/embed/useformtableexample3-mz02e?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## API

```jsx
const obj = useFormTable(config);
```

- config

<table>
  <thead>
    <tr>
      <th>关键字</th>
      <th>描述</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>search</td>
      <td>Request 方法，参数是表单字段的值。该方法需要返回一个数组或 SearchResponseData 的 Promise。</td>
      <td>(requestData) => Promise | responseData</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>经 Form.create() 包装过的组件会自带 this.props.form 属性（antd3）；useForm react hooks（antd4）</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>autoFirstSearch</td>
      <td>搜索方法是否将自动执行。</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>defaultPageSize</td>
      <td>默认页面大小</td>
      <td>number</td>
      <td>10</td>
    </tr>
    <tr>
      <td>defaultCurrent</td>
      <td>默认当前页面</td>
      <td>number</td>
      <td>1</td>
    </tr>
    <tr>
      <td>defaultFormValues</td>
      <td>默认表单值。如果表单中有需要回填的数据，请使用它来获取数据。</td>
      <td>object</td>
      <td>{}</td>
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


- obj

<table>
  <thead>
    <tr>
      <th>关键字</th>
      <th>描述</th>
      <th>类型</th>
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
      <td>表单实例</td>
      <td></td>
    </tr>
    <tr>
      <td>loading</td>
      <td>表单请求加载</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>current</td>
      <td>当前页面</td>
      <td>number</td>
    </tr>
    <tr>
      <td>pageSize</td>
      <td>页面大小</td>
      <td>number</td>
    </tr>
    <tr>
      <td>formValues</td>
      <td>表单值</td>
      <td>object</td>
    </tr>
    <tr>
      <td>list</td>
      <td>"list prop" 通过 Search 方法返回。如果你使用的是 antd 的 Table 而不是 useFormTable 的 Table，则可以使用此值传递给 Table dataSource prop。</td>
      <td>array</td>
    </tr>
    <tr>
      <td>total</td>
      <td>"total prop" 通过 Search 方法返回。</td>
      <td>number</td>
    </tr>
    <tr>
      <td>defaultFormValuesLoading</td>
      <td>当使用 "defaultFormValues" 时，该值在请求期间为 true。</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>filters</td>
      <td>antd Table 过滤器</td>
      <td>object</td>
    </tr>
    <tr>
      <td>sorter</td>
      <td>antd Table 排序器</td>
      <td>object</td>
    </tr>
    <tr>
      <td>search</td>
      <td>将调用 "search" 方法</td>
      <td>(requestData) => void</td>
    </tr>
  </tbody>
</table>
