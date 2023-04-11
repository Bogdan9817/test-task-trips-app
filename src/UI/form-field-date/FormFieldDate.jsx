import { Form } from "bootstrap-4-react";

export default function FormFieldDate({ value, label, onChange, id }) {
  return (
    <Form.Group mb='3'>
      <label htmlFor={id}>{label}</label>
      <Form.Input
        id={id}
        type='datetime-local'
        name={value}
        onChange={onChange}
      />
    </Form.Group>
  );
}
