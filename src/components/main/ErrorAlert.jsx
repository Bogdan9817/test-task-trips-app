import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/global/GlobalContext";

import "./styles/alert.css";
import { Alert } from "bootstrap-4-react";

export default function ErrorAlert() {
  const { errors } = useContext(GlobalContext);
  const [hidden, setHidden] = useState(true);

  let timer = useRef();
  useEffect(() => {
    clearTimeout(timer.current);
    setHidden(false);
    timer.current = setTimeout(() => {
      setHidden(true);
    }, 4000);
  }, [errors]);

  return (
    <div className={`alert-container ${hidden ? "hidden" : ""}`}>
      {errors?.map((msg, idx) => {
        return (
          <Alert key={`error-msg-id-${idx}`} danger>
            {msg}
          </Alert>
        );
      })}
    </div>
  );
}
