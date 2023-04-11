import text from "./text.json";

export const validateUserInfo = async ({ age, phone }) => {
  const { nothingToUpdate, wrongAge, wrongNumber } = text.validateUserInfo;
  return new Promise((resolve, reject) => {
    let errors = [];
    if (!age && !phone) errors.push(nothingToUpdate);
    if (Number.isNaN(age)) errors.push(wrongAge);

    if (!phone.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)) {
      errors.push(wrongNumber);
    }
    errors.length > 0 ? reject(errors) : resolve();
  });
};

export const validateCar = async ({ model, lpn, color }) => {
  const { fillAllField } = text.validateCar;
  return new Promise((resolve, reject) => {
    let errors = [];
    if (!model || !lpn || !color) errors.push(fillAllField);
    if (errors.length > 0) reject(errors);
    resolve();
  });
};
