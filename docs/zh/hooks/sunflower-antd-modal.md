---
title: useModal
---

# useModal


## 示例

默认形式：

<iframe src="https://codesandbox.io/embed/usemodalexample1-2hrtp?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## 概览

`useModal` 是一个 React-Hook。当你想使用 "Modal" 的时候，你可以使用它。


## API

```jsx
const obj = useModal(config);
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
      <td>antd 模态属性（props）</td>
      <td></td>
    </tr>
    <tr>
      <td>show</td>
      <td>指定可以打开模态的函数</td>
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
  </tbody>
</table>
