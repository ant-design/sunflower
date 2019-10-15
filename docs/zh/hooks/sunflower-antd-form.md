---
title: useForm
---

# useFormTable


## Overview

`useFormTable` 是一个 React Hook。当你想使用 "Form" 的时候，你可以使用它。

## Examples

默认形式：

<iframe src="https://codesandbox.io/embed/useformexample1-rvzvw?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Submit 方法：

<iframe src="https://codesandbox.io/embed/useformexample2-0xl2f?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

默认表单值：

<iframe src="https://codesandbox.io/embed/useformexample3-6mj9g?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## API

```jsx
const obj = useForm(config);
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
      <td>submit</td>
      <td>Submit 方法，参数是表单字段的值。</td>
      <td>(formValues) => Promise | formResult</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>经 Form.create() 包装过的组件会自带 this.props.form 属性（antd3）；useForm react hooks（antd4）</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>defaultFormValues</td>
      <td>默认表单值。如果表单中有需要回填的数据，请使用它来获取数据。</td>
      <td>object</td>
      <td>{}</td>
    </tr>
  </tbody>
</table>


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
      <td>form</td>
      <td>表单实例</td>
      <td></td>
    </tr>
    <tr>
      <td>formLoading</td>
      <td>表单请求加载</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>formValues</td>
      <td>表单值</td>
      <td>object</td>
    </tr>
    <tr>
      <td>initialValues</td>
      <td>初始表单值</td>
      <td>object</td>
    </tr>
    <tr>
      <td>formResult</td>
      <td>提交回填值</td>
      <td></td>
    </tr>
    <tr>
      <td>defaultFormValuesLoading</td>
      <td>使用 "defaultFormValues" 时，该值在请求期间为 true。</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>submit</td>
      <td>将调用 "submit" 方法</td>
      <td></td>
    </tr>
  </tbody>
</table>
