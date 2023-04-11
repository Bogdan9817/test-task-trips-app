import { useContext, useState } from "react";
import { Form, Container, Button } from "bootstrap-4-react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

import {
  loginWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
} from "../../api/auth";

import { ValidateLogin } from "./validate";

import { GlobalContext } from "../../context/global/GlobalContext";

import FormFieldInput from "../../UI/form-field-input/FormFieldInput";

import fields from "./fields.json";
import text from "./text.json";

export default function LoginForm() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { setUser, setErrors, setSuccessMsg } = useContext(GlobalContext);
  const { wrongPass, userNotFound, others } = text.login.errors;
  const { welcome } = text.login.success;
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await ValidateLogin(userInfo);
      try {
        await loginWithEmailAndPassword(res.email, res.password, setUser);
        setSuccessMsg(welcome);
      } catch (error) {
        const { code } = error;
        if (code === wrongPass.check) return setErrors([wrongPass.error]);
        if (code === userNotFound.check) return setErrors([userNotFound.error]);
        return setErrors([others]);
      }
    } catch (err) {
      setErrors(err);
    }
  };

  const handleSignIn = async (fn) => {
    try {
      await fn(setUser);
      setSuccessMsg(welcome);
    } catch (e) {
      setErrors([others]);
    }
  };

  return (
    <>
      <Form p='4' display='flex' flex='column' justifyContent='flex-end'>
        {fields.logIn.map((field) => {
          return (
            <FormFieldInput key={field.id} onChange={handleChange} {...field} />
          );
        })}
        <Button dark size='lg' onClick={handleLogin}>
          {text.login.loginBtn}
        </Button>
      </Form>
      <Container display='flex' flex='row' justifyContent='center' pt='2'>
        <FaFacebookF
          color='#4267B2'
          size={36}
          onClick={() => handleSignIn(signInWithFacebook)}
        />
        <FaGoogle
          color='#DB4437'
          size={36}
          onClick={() => handleSignIn(signInWithGoogle)}
        />
      </Container>
    </>
  );
}
