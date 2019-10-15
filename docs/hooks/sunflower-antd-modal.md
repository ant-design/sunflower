---
title: useModal
---

# useModal


## Examples

Default

<iframe src="https://codesandbox.io/embed/usemodalexample1-2hrtp?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## Overview

`useModal` is a react-hooks.When you want to use "Modal", you can use it.


## API

```jsx
const obj = useModal(config);
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
      <td>defaultVisible</td>
      <td>Whether the modal dialog is visible or not</td>
      <td>boolean</td>
      <td>false</td>
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
      <td>modalProps</td>
      <td>antd Modal props</td>
      <td></td>
    </tr>
    <tr>
      <td>show</td>
      <td>Specify a function that can open the modal</td>
      <td>() => void</td>
    </tr>
    <tr>
      <td>close</td>
      <td>Specify a function that can close the modal</td>
      <td>() => void</td>
    </tr>
    <tr>
      <td>visible</td>
      <td>Whether the modal dialog is visible or not</td>
      <td>boolean</td>
    </tr>
  </tbody>
</table>
