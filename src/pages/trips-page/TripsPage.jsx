import { useContext, useState } from "react";
import CreateTripForm from "../../components/trips/CreateTripForm";
import { GlobalContext } from "../../context/global/GlobalContext";
import TripList from "../../components/trips/TripList";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./styles.css";

import text from "./text.json";

const roles = ["dispatcher", "admin"];

function TripsPage() {
  const { user } = useContext(GlobalContext);

  const [formHidden, setFormHidden] = useState(true);

  const trigger = () => {
    setFormHidden(!formHidden);
  };

  if (roles.some((role) => user.role === role)) {
    return (
      <div className='content-wrapper'>
        <div className='heading trips-heading'>
          <h2>{text.heading}</h2>
          {formHidden ? (
            <FaPlus onClick={trigger} size={36} color='#343434' />
          ) : (
            <FaMinus onClick={trigger} size={36} color='#343434' />
          )}
        </div>
        {formHidden ? <TripList /> : <CreateTripForm />}
      </div>
    );
  }

  return (
    <div className='content-wrapper'>
      <div className='heading'>
        <h2>{text.heading}</h2>
      </div>
      <TripList />
    </div>
  );
}

export default TripsPage;
