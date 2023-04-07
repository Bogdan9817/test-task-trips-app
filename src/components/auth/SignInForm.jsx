import { Form, Alert, Button } from "bootstrap-4-react";
import { useContext, useState } from "react";
import { registerUserViaEmailAndPassword } from "../../api/auth";
import { AuthContext } from "../../context/auth/AuthContext";
import FormField from "./FormField";
import ValidationErrors from "./ValidationErrors";
import { ValidateSignIn } from "./validate";

export default function SignInForm() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });
  const [errors, setErrors] = useState([]);
  const [serverError, setServerError] = useState();
  const [created, setCreated] = useState(false);
  const [hidden, setHidden] = useState(true);
  const { setUser } = useContext(AuthContext);

  const fields = [
    {
      data: { value: "name", label: "Введіть ім'я", type: "text" },
      actions: {
        onChange: (e) => handleChange(e),
      },
    },
    {
      data: { value: "email", label: "Введіть email", type: "text" },
      actions: {
        onChange: (e) => handleChange(e),
      },
    },
    {
      data: {
        value: "password",
        label: "Введіть пароль",
        type: "password",
      },
      actions: {
        onChange: (e) => handleChange(e),
      },
    },
    {
      data: {
        value: "confirmPassword",
        label: "Підтвердіть пароль",
        type: "password",
      },
      actions: {
        onChange: (e) => handleChange(e),
      },
    },
    {
      data: {
        value: "age",
        label: "Введіть вік",
        type: "number",
      },
      actions: {
        onChange: (e) => handleChange(e),
        onKeyDown: (e) => handleKeyDown(e),
      },
    },
  ];

  const handleChange = (e) => {
    setErrors([]);
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 190 || e.keyCode === 110) {
      e.preventDefault();
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await ValidateSignIn(userInfo);

      try {
        await registerUserViaEmailAndPassword(res, setUser);
      } catch (error) {
        setServerError(error.message);
      }
    } catch (err) {
      setErrors(err);
      setTimeout(() => {
        setErrors([]);
      }, 4000);
    }
  };

  return (
    <>
      <Form p='4' display='flex' flex='column' justifyContent='flex-end'>
        {created && <Alert primary>User created </Alert>}
        {fields.map((field, idx) => {
          return <FormField key={field.data.value + idx} {...field} />;
        })}
        <Button dark onClick={submit}>
          Sign In
        </Button>
      </Form>
      <ValidationErrors errors={errors} />
    </>
  );
}
