import { useEffect, useRef, useState } from "react";
import { Alert } from "bootstrap-4-react";
import "./styles.css";

export default function AlertMessage(props) {
  const { message, type } = props;
  const [hidden, setHidden] = useState(true);
  let timer = useRef();
  useEffect(() => {
    clearTimeout(timer.current);
    setHidden(false);
    timer.current = setTimeout(() => {
      setHidden(true);
    }, 3000);
  }, [message]);
  if (!props) return;

  return (
    <div className={`alert-container ${hidden ? "hidden" : ""}`}>
      {type === "success" && <Alert success>{message}</Alert>}
      {type === "danger" && <Alert danger>{message}</Alert>}
    </div>
  );
}
