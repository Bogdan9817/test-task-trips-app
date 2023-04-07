import { Form } from "bootstrap-4-react";

export default function FormField({ data, actions }) {
  return (
    <Form.Group mb='3'>
      <label htmlFor={`signin-${data.value}-label`}>{data.label}</label>
      <Form.Input
        id={`signin-${data.value}-label`}
        type={data.type}
        autoComplete='false'
        name={data.value}
        {...actions}
      />
    </Form.Group>
  );
}
