import { get, ref, set } from "firebase/database";
import { database } from "./firebase";

export const getDriverTrips = async (uid) => {
  const driverTrips = (await get(ref(database, "trips/" + uid))).val();
  const trips = [];
  for (let trip in driverTrips) {
    const timeTo = new Date(driverTrips[trip].timeTo);
    if (timeTo > new Date()) {
      trips.push(driverTrips[trip]);
    }
  }
  return trips;
};

export const getDriverCar = async (uid) => {
  const carInfo = (await get(ref(database, "cars/" + uid))).val();
  return carInfo;
};

export const setDriverCar = async (uid, carInfo) => {
  await set(ref(database, "cars/" + uid), carInfo);
};
