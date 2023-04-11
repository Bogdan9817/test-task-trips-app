import { Form } from "bootstrap-4-react";

export default function FormFieldInput({
  label,
  value,
  id,
  onChange,
  type = "text",
}) {
  return (
    <Form.Group mb='3'>
      <label htmlFor={id}>{label}</label>
      <Form.Input
        id={id}
        type={type}
        autoComplete='false'
        name={value}
        onChange={onChange}
      />
    </Form.Group>
  );
}
