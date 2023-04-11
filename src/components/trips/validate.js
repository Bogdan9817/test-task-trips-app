import text from "./text.json";

export const ValidateTrip = ({
  from,
  to,
  passengerLimit,
  timeFrom,
  timeTo,
  driver,
  price,
}) => {
  return new Promise((resolve, reject) => {
    const { fillAllFields, qtyTooMuch, timeError } = text.validateTrip;
    const errors = [];
    if (
      !from ||
      !to ||
      !passengerLimit ||
      !timeFrom ||
      !timeTo ||
      !driver ||
      !price
    ) {
      errors.push(fillAllFields);
    }
    if (passengerLimit > 150) {
      errors.push(qtyTooMuch);
    }
    if (new Date(timeFrom) > new Date(timeTo)) {
      errors.push(timeError);
    }

    if (errors.length > 0) reject(errors);
    resolve();
  });
};
