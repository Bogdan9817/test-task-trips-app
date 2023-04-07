import { Form, Container } from "bootstrap-4-react";
import { useContext, useState } from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { createPortal } from "react-dom";

import {
  loginWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
} from "../../api/auth";
import { Button } from "bootstrap-4-react/lib/components";
import { AuthContext } from "../../context/auth/AuthContext";
import ValidateLogin from "./validate";
import ValidationErrors from "./ValidationErrors";

export default function LoginForm() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [hidden, setHidden] = useState(true);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await ValidateLogin(userInfo);
      try {
        await loginWithEmailAndPassword(res.email, res.password, setUser);
      } catch (e) {
        console.log(e);
      }
    } catch (err) {
      setErrors(err);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };

  const handleSignIn = async (fn) => {
    try {
      await fn(setUser);
    } catch (e) {
      // setErrors([e.message]);
    }
  };

  return (
    <>
      <Form p='4' display='flex' flex='column' justifyContent='flex-end'>
        <Form.Group mb='3'>
          <label htmlFor='signin-email-input'> Введіть email</label>
          <Form.Input
            onChange={handleChange}
            id='signin-email-input'
            type='email'
            name='email'
          />
        </Form.Group>
        <Form.Group mb='3'>
          <label htmlFor='signin-password-input'>Введіть пароль</label>
          <Form.Input
            onChange={handleChange}
            id='signin-password-input'
            autoComplete='false'
            type='password'
            name='password'
          />
        </Form.Group>
        <Button dark size='lg' onClick={handleLogin}>
          Login
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
      <ValidationErrors errors={errors} />
    </>
  );
}
