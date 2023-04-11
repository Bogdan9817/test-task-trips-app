import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/user-info");
    }, 5000);
  }, [navigate]);

  return (
    <div id='error-page' className='error-page'>
      <h1>Ой!</h1>
      <p>Щось пішло не так...</p>
      <p>
        <i>Ви будете переведені на особисту сторінку через 5 секунд</i>
      </p>
    </div>
  );
}
