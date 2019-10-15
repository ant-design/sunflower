---
title: useForm
---

# useFormTable


## Overview

`useFormTable` is a react-hooks. When you want to use "Form", you can use it.

## Examples

Default

<iframe src="https://codesandbox.io/embed/useformexample1-rvzvw?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

submit method

<iframe src="https://codesandbox.io/embed/useformexample2-0xl2f?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

defaultFormValues

<iframe src="https://codesandbox.io/embed/useformexample3-6mj9g?fontsize=14" title="sunflower" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; margin-bottom: 60px; border: 1px solid rgb(206, 212, 222); padding: 0.6em; border-radius: 4px; overflow: hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## API

```jsx
const obj = useForm(config);
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
      <td>submit</td>
      <td>submit method, the parameter is the value of the form fields</td>
      <td dangerouslySetInnerHTML={{__html: '(formValues) => Promise<formResult> | formResult'}}></td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>Decorated by Form.create() will be automatically set this.props.form property(antd3); useForm react hooks(antd4)</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>defaultFormValues</td>
      <td>Default form values.If the form has data that needs to be backfilled, use it to get the data.</td>
      <td>object</td>
      <td dangerouslySetInnerHTML={{__html: '{}'}}></td>
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
      <td>formProps</td>
      <td>antd Form props</td>
      <td></td>
    </tr>
    <tr>
      <td>form</td>
      <td>Form instance</td>
      <td></td>
    </tr>
    <tr>
      <td>formLoading</td>
      <td>form request loading.</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>formValues</td>
      <td>form values</td>
      <td>object</td>
    </tr>
    <tr>
      <td>initialValues</td>
      <td>initial form values</td>
      <td>object</td>
    </tr>
    <tr>
      <td>formResult</td>
      <td>submit return value</td>
      <td></td>
    </tr>
    <tr>
      <td>defaultFormValuesLoading</td>
      <td>When use 'defaultFormValues', the value will be true during the request.</td>
      <td>boolean</td>
    </tr>
    <tr>
      <td>submit</td>
      <td>will call the 'submit' method</td>
      <td></td>
    </tr>
  </tbody>
</table>
