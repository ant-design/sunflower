---
title: useCascadeSelect
---

# useCascadeSelect


## Overview

`useCascadeSelect` is a react-hooks.When you want to use cascading select, you can use it.


## Examples

This is a typical cascading select scene.When you select the first one, the second function is called with the selected value as a parameter. When you change the previous select option, the subsequent select values ​​will be cleared.

<iframe src="https://codesandbox.io/embed/usecascadeselectexample1-g5hbp?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

With defaultFormValues

<iframe src="https://codesandbox.io/embed/usecascadeselectexample2-2rm67?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## API

```jsx
const obj = useCascadeSelect(config);
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
      <td>list</td>
      <td>Cascading method array. Each method returns a select list of options. When the previous select value change, the subsequent method will be triggered with previous select value.</td>
      <td>name, options</td>
      <td>[]</td>
    </tr>
    <tr>
      <td>autoFirstSearch</td>
      <td>Whether the first method in the list will be executed automatically.</td>
      <td>boolean</td>
      <td>true</td>
    </tr>
  </tbody>
</table>


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
      <td>selects</td>
      <td>antd Select props array, according to the length of the config list</td>
      <td>props, options</td>
    </tr>
    <tr>
      <td>search</td>
      <td>Execute the method of specifying the index in the config list,usually do not need to use.</td>
      <td>(index: number, value: string) => void</td>
    </tr>
  </tbody>
</table>
