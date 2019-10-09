---
title: useModalForm
---

# useModalForm


## Examples

默认形式：

<iframe src="https://codesandbox.io/embed/usemodalformexample1-x4jlt?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

带有默认值：

<iframe src="https://codesandbox.io/embed/usemodalformexample2-1r4iq?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Submit 方法：

<iframe src="https://codesandbox.io/embed/usemodalformexample3-523db?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

默认表单提交：

<iframe src="https://codesandbox.io/embed/usemodalformexample4-p4ptr?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## 概览

`useModalForm` 是一个 React Hook，当你想使用 "Modal Form" 的时候，你可以使用它。


## API

```jsx
const obj = useModalForm(config);
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
      <td>defaultVisible</td>
      <td>模态（Modal）对话框是否可见</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
     <tr>
      <td>autoSubmitClose</td>
      <td>单击 "ok" 模态（Modal），将触发提交，然后关闭模态。</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>autoResetForm</td>
      <td>将重置指定字段的值（重置为 initialValue）和状态</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
    <tr>
      <td>submit</td>
      <td>Submit 方法，该参数是表单字段的值。</td>
      <td>(formValues) => Promise<formResult> | formResult</td>
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
      <td>modalProps</td>
      <td>antd Modal props</td>
      <td></td>
    </tr>
    <tr>
      <td>show</td>
      <td>指定可以打开模态（modal）的函数</td>
      <td>() => void</td>
    </tr>
    <tr>
      <td>close</td>
      <td>指定可以关闭模态的函数</td>
      <td>() => void</td>
    </tr>
    <tr>
      <td>visible</td>
      <td>模态对话框是否可见</td>
      <td>boolean</td>
    </tr>
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
