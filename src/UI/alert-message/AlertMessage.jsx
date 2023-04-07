import { useEffect, useState } from "react";
import { Alert } from "bootstrap-4-react";
import "./styles.css";

export default function AlertMessage(props) {
  const { message, delay, type } = props;
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(false);
    setTimeout(() => {
      setHidden(true);
    }, delay || 3000);
  }, [message]);
  if (!props) return;

  return (
    <div className={`alert-container ${hidden ? "hidden" : ""}`}>
      {type === "success" && <Alert success>{message}</Alert>}
      {type === "danger" && <Alert danger>{message}</Alert>}
    </div>
  );
}
