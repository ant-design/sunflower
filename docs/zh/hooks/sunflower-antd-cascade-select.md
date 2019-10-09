---
title: useCascadeSelect
---

# useCascadeSelect


## 概览

`useCascadeSelect` 是一个 React Hook。你可以使用它实现级联选择。


## 示例

这是一个典型的级联选择场景，当你选择第一个时，第二个函数将以所选值作为参数进行调用。当你更改前一个选项时，与其相关联的值则会被清除。

<iframe src="https://codesandbox.io/embed/usecascadeselectexample1-g5hbp?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

带有默认表单值：

<iframe src="https://codesandbox.io/embed/usecascadeselectexample2-2rm67?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## API

```jsx
const obj = useCascadeSelect(config);
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
      <td>list</td>
      <td>级联方法数组。每种方法都将返回一个选项选择列表。当前一个选择值被更改时，前一个选择值将触发后一个方法。</td>
      <td>name, options</td>
      <td>[]</td>
    </tr>
    <tr>
      <td>autoFirstSearch</td>
      <td>列表中的第一个方法是否将自动执行。</td>
      <td>boolean</td>
      <td>true</td>
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
      <td>selects</td>
      <td>antd Select props 数组，依据配置列表的长度。</td>
      <td>props, options</td>
    </tr>
    <tr>
      <td>search</td>
      <td>执行在配置列表中指定索引的方法，通常不需要使用。</td>
      <td>(index: number, value: string) => void</td>
    </tr>
  </tbody>
</table>
