import { useContext, useEffect, useState } from "react";
import { getDriverTrips } from "../../api/driver";

import { GlobalContext } from "../../context/global/GlobalContext";

import Loader from "../../UI/loader/Loader";
import Trip from "../trips/Trip";
import DriverCar from "./DriverCar";

import text from "./text.json";
import "./styles/driver-information.css";

export default function DriverInformation() {
  const [myTrips, setMyTrips] = useState([]);
  const [load, setLoad] = useState(false);
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    async function loadTrips() {
      setLoad(true);
      const res = await getDriverTrips(user.uid);
      setMyTrips(res);
      setLoad(false);
    }
    if (user?.uid) {
      loadTrips();
    }
  }, [user.uid]);

  if (load) {
    return <Loader />;
  }

  return (
    <div className='driver-information'>
      <DriverCar />
      <div>
        <h3>{text.driverInformation.heading}</h3>
        {myTrips.map((trip) => (
          <Trip
            key={trip.tripUid}
            {...trip}
            loadCar={false}
            loadContacts={false}
          />
        ))}
      </div>
    </div>
  );
}
