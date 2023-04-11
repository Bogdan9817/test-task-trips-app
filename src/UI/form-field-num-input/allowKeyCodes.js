const numInputTypes = {
  AGE: "age",
  PHONE: "phone",
  DEFAULT: "default",
};

export default function allowKeyCodes(type, e) {
  if (type === numInputTypes.AGE) {
    const allowedKeyCodes = [8, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
    if (e.target.value.length > 1 && e.keyCode !== 8) {
      e.preventDefault();
    }
    if (allowedKeyCodes.every((code) => code !== e.keyCode)) {
      e.preventDefault();
    }
    return;
  }
  if (type === numInputTypes.PHONE) {
    const allowedKeyCodes = [
      8, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 32,
    ];

    if (allowedKeyCodes.every((code) => code !== e.keyCode)) {
      e.preventDefault();
    }
    return;
  }
  if (type === numInputTypes.DEFAULT) {
    const allowedKeyCodes = [8, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
    if (allowedKeyCodes.every((code) => code !== e.keyCode)) {
      e.preventDefault();
    }
    return;
  }
}
