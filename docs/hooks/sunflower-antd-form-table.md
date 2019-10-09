---
title: useFormTable
---

# useFormTable


## Overview

`useFormTable` is a react-hooks.When you want to use "Form Search Table", you can use it.


## Examples

Default

<iframe src="https://codesandbox.io/embed/useformtableexample1-t6e6v?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

With filters and sorter

<iframe src="https://codesandbox.io/embed/useformtableexample2-izvwq?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

With defaultFormValues

<iframe src="https://codesandbox.io/embed/useformtableexample3-mz02e?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## API

```jsx
const obj = useFormTable(config);
```

- config

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
      <td>(requestData) => Promise | responseData</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>Decorated by Form.create() will be automatically set this.props.form property(antd3); useForm react hooks(antd4)</td>
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
      <td>object</td>
      <td dangerouslySetInnerHTML={{__html: '{}'}}></td>
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
      <td>list</td>
      <td>The value's 'list prop' returned by the search method.If you use antd's Table instead of useFormTable's Table, you can use this value to pass to Table dataSource prop.</td>
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
      <td>will call the 'search' method</td>
      <td>(requestData) => void</td>
    </tr>
  </tbody>
</table>
