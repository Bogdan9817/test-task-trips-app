import text from "./text.json";

export const ValidateSignIn = async (userInfo) => {
  const { fillField, incorrectEmail, passNotEqual, weakPass, incorrectAge } =
    text.validateSignIn;
  return new Promise((resolve, reject) => {
    const errors = [];
    for (let key in userInfo) {
      !userInfo[key] && errors.push(fillField + " " + key);
    }
    if (!userInfo.email.match(/(\w|\d)+@\w+\.\w{2,3}/)) {
      errors.push(incorrectEmail);
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      errors.push(passNotEqual);
    }
    if (userInfo.password.length < 8) errors.push(weakPass);
    if (userInfo.age > 100) errors.push(incorrectAge);
    if (errors.length > 0) {
      reject(errors);
    } else {
      resolve({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        age: userInfo.age,
      });
    }
  });
};

export const ValidateLogin = async (userInfo) => {
  const { fillField, incorrectEmail } = text.validateLogin;
  return new Promise((resolve, reject) => {
    const errors = [];
    for (let key in userInfo) {
      !userInfo[key] && errors.push(fillField + " " + key);
    }
    if (!userInfo.email.match(/(\w|\d)+@\w+\.\w{2,3}/)) {
      errors.push(incorrectEmail);
    }
    if (errors.length > 0) {
      reject(errors);
    } else {
      resolve(userInfo);
    }
  });
};
