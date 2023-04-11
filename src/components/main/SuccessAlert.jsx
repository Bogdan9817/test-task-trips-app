import { useContext, useEffect, useRef, useState } from "react";
import { Alert } from "bootstrap-4-react";

import { GlobalContext } from "../../context/global/GlobalContext";

export default function SuccessAlert() {
  const { successMsg } = useContext(GlobalContext);
  const [hidden, setHidden] = useState(true);
  let timer = useRef();
  useEffect(() => {
    clearTimeout(timer.current);
    setHidden(false);
    timer.current = setTimeout(() => {
      setHidden(true);
    }, 4000);
  }, [successMsg]);

  return (
    <div className={`alert-container ${hidden ? "hidden" : ""}`}>
      {successMsg && <Alert success>{successMsg}</Alert>}
    </div>
  );
}
