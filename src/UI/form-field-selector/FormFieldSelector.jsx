import { Form } from "bootstrap-4-react";

export default function FormFieldSelector({
  label,
  value,
  allowedValues,
  onChange,
  id,
  defaultValue = "none",
}) {
  return (
    <Form.Group mb='3'>
      <label htmlFor={id}>{label}</label>
      <Form.CustomSelect name={value} onChange={onChange}>
        <option value={defaultValue}>{defaultValue}</option>
        {allowedValues.map((el, index) => {
          return (
            <option value={el?.value} key={id + index}>
              {el?.label}
            </option>
          );
        })}
      </Form.CustomSelect>
    </Form.Group>
  );
}
