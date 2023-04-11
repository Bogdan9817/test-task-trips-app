import { Form } from "bootstrap-4-react";
import allowKeyCodes from "./allowKeyCodes";

export default function FormFieldNumInput({
  label,
  value,
  onChange,
  subType,
  id,
}) {
  const onKeyDown = (e) => {
    allowKeyCodes(subType, e);
  };

  return (
    <Form.Group mb='3'>
      <label htmlFor={id}>{label}</label>
      <Form.Input
        id={id}
        type='text'
        onKeyDown={onKeyDown}
        name={value}
        onChange={onChange}
      />
    </Form.Group>
  );
}
