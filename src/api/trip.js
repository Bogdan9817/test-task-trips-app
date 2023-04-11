import { equalTo, get, orderByChild, query, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { database } from "./firebase";

export const getAvailableDrivers = async (timeFrom, timeTo) => {
  const usersRef = ref(database, "users");
  const driverQuery = query(usersRef, orderByChild("role"), equalTo("driver"));
  const allDrivers = (await get(driverQuery)).val();
  const availableDrivers = [];
  for (let driver in allDrivers) {
    const trips = await (
      await get(ref(database, "/trips/" + allDrivers[driver].uid))
    ).val();
    if (!trips || !timeFrom || !timeTo) {
      availableDrivers.push({
        value: allDrivers[driver].uid,
        label: allDrivers[driver].name,
      });
    } else {
      let busy = filterByTime(timeFrom, timeTo, trips);
      !busy &&
        availableDrivers.push({
          value: allDrivers[driver].uid,
          label: allDrivers[driver].name,
        });
    }
  }
  return availableDrivers;
};

export const createTrip = async (tripData) => {
  const tripUid = uuidv4();
  await set(ref(database, "/trips/" + tripData.driver + "/" + tripUid), {
    ...tripData,
    tripUid,
  });
  return { ...tripData, tripUid };
};

const filterByTime = (timeFrom, timeTo, trips) => {
  const from = new Date(timeFrom);
  const to = new Date(timeTo);

  let isBusy = true;
  for (let trip in trips) {
    const tripFrom = new Date(trips[trip].timeFrom);
    const tripTo = new Date(trips[trip].timeTo);
    if (
      (tripFrom < from && tripFrom < to && tripTo < from && tripTo < to) ||
      (tripFrom > from && tripFrom > to && tripTo > from && tripTo > to)
    ) {
      isBusy = false;
    }
  }
  return isBusy;
};

export const getAllTrips = async () => {
  const tripsData = (await get(ref(database, "trips"))).val();
  const trips = [];

  for (let driver in tripsData) {
    for (let trip in tripsData[driver]) {
      trips.push({ ...tripsData[driver][trip], tripUid: trip });
    }
  }
  return trips;
};

export const getDriverContacts = async (uid) => {
  const phone = (await get(ref(database, "/users/" + uid + "/phone"))).val();
  const email = (await get(ref(database, "/users/" + uid + "/email"))).val();
  const name = (await get(ref(database, "/users/" + uid + "/name"))).val();
  return { phone, email, name };
};

export const getDriverCar = async (uid) => {
  return (await get(ref(database, "/cars/" + uid))).val();
};
