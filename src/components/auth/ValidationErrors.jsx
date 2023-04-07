import "./styles/validation-errors.css";
import AlertMessage from "../../UI/alert-message/AlertMessage";

export default function ValidationErrors({ errors }) {
  return (
    <div className='validation-error-container'>
      {errors.map((err, idx) => {
        return <AlertMessage key={"error" + idx} message={err} type='danger' />;
      })}
    </div>
  );
}
