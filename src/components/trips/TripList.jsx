import { useEffect, useState } from "react";
import { getAllTrips } from "../../api/trip";
import Trip from "./Trip";
import Loader from "../../UI/loader/Loader";

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const loadTrips = async () => {
      setLoad(true);
      const tripList = await getAllTrips();
      setTrips(tripList);
      setLoad(false);
    };
    loadTrips();
  }, []);

  if (load) {
    return <Loader />;
  }
  return (
    <div>
      {trips.map((trip) => (
        <Trip key={trip.tripUid} {...trip} />
      ))}
    </div>
  );
}
