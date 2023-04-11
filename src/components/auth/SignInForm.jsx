import { useContext, useState } from "react";
import { Form, Button } from "bootstrap-4-react";

import { registerUserViaEmailAndPassword } from "../../api/auth";

import { ValidateSignIn } from "./validate";

import { GlobalContext } from "../../context/global/GlobalContext";

import FormFieldInput from "../../UI/form-field-input/FormFieldInput";

import fieldsData from "./fields.json";
import text from "./text.json";

export default function SignInForm() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { setUser, setErrors, setSuccessMsg } = useContext(GlobalContext);
  const { userExists, others } = text.signIn.errors;
  const { registered } = text.signIn.success;
  const handleChange = (e) => {
    setErrors([]);
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await ValidateSignIn(userInfo);
      try {
        await registerUserViaEmailAndPassword(res, setUser);
        setSuccessMsg(registered);
      } catch (error) {
        if (error.code === userExists.check) {
          setErrors([userExists.error]);
        } else {
          setErrors(others);
        }
      }
    } catch (err) {
      setErrors(err);
    }
  };

  return (
    <>
      <Form p='4' display='flex' flex='column' justifyContent='flex-end'>
        {fieldsData.signIn.map((field) => {
          return (
            <FormFieldInput key={field.id} onChange={handleChange} {...field} />
          );
        })}
        <Button dark onClick={submit}>
          {text.signIn.signInBtn}
        </Button>
      </Form>
    </>
  );
}
