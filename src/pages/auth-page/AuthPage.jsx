import { useEffect, useState } from "react";
import { Container } from "bootstrap-4-react";
import LoginForm from "../../components/auth/LoginForm";
import SignInForm from "../../components/auth/SignInForm";
import "./styles.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [animate, setAnimate] = useState(false);

  const FormTrigger = (Form, btnLabel) => {
    return (
      <Container>
        <Form />
        <Container display='flex' align='right' px='4' py='2'>
          <span
            className='trigger'
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {btnLabel}
          </span>
        </Container>
      </Container>
    );
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className='page'>
      <Container
        w='50'
        shadow
        className={`innerContainer ${animate ? "animate" : ""} `}
      >
        {isLogin && FormTrigger(LoginForm, "Sign In")}
        {!isLogin && FormTrigger(SignInForm, "Log In")}
      </Container>
    </div>
  );
}
