export async function ValidateSignIn(userInfo) {
  return new Promise((resolve, reject) => {
    const errors = [];
    for (let key in userInfo) {
      !userInfo[key] && errors.push(`Fill the ${key} field`);
    }
    if (!userInfo.email.match(/(\w|\d)+@\w+\.\w{2,3}/)) {
      errors.push("Email is not correct");
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      errors.push("Passwords is not equal");
    }

    if (userInfo.password.length < 8) {
      errors.push("Your password is too weak, make more/equal 8 chars");
    }

    if (userInfo.age < 18) {
      errors.push("Is not adult");
    }
    if (userInfo.age > 100) {
      errors.push("Incorrect age");
    }

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
}

export default async function ValidateLogin(userInfo) {
  return new Promise((resolve, reject) => {
    const errors = [];
    for (let key in userInfo) {
      !userInfo[key] && errors.push(`Fill the ${key} field`);
    }
    if (!userInfo.email.match(/(\w|\d)+@\w+\.\w{2,3}/)) {
      errors.push("Email is not correct");
    }
    if (errors.length > 0) {
      reject(errors);
    } else {
      resolve(userInfo);
    }
  });
}
