import { useContext, useState } from "react";
import { Container, Button } from "bootstrap-4-react";

import { updateUserData } from "../../api/user";

import { validateUserInfo } from "./validate";

import { UserContext } from "../../context/user/UserContext";
import { GlobalContext } from "../../context/global/GlobalContext";

import FormFieldNumInput from "../../UI/form-field-num-input/FormFieldNumInput";
import Value from "../../UI/value/Value";
import Loader from "../../UI/loader/Loader";
import DriverInformation from "./DriverInformation";

import text from "./text.json";
import "./styles/user-information.css";

export default function UserInformation() {
  const { setErrors, setSuccessMsg, user } = useContext(GlobalContext);
  const { state, dispatch } = useContext(UserContext);
  const { name, email, age, role, phone, uid } = state.user;
  const [userInfo, setUserInfo] = useState(state.user);
  const [load, setLoad] = useState(false);

  const { infoUpdated } = text.userInformation.success;
  const { others } = text.userInformation.errors;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      await validateUserInfo(userInfo);
      try {
        await updateUserData({ phone: userInfo.phone, age: userInfo.age, uid });
        dispatch({
          type: "UPDATE_USER_INFO",
          payload: { ...userInfo },
        });
        setSuccessMsg(infoUpdated);
      } catch (e) {
        setErrors([others]);
      }
    } catch (errs) {
      setErrors(errs);
    }
    setLoad(false);
  };

  const saveBtnRender = () => {
    if (!age || !phone) {
      return (
        <Button dark onClick={handleSave}>
          {text.userInformation.saveUserInfoBtn}
        </Button>
      );
    }
    return <></>;
  };

  if (load) {
    return <Loader />;
  }

  return (
    <div className='user-information'>
      <Value value={name} label='Імя' />
      <Value value={email} label='Email' />
      <Value value={role} label='Роль' />

      {age ? (
        <Value value={age} label='Age' />
      ) : (
        <FormFieldNumInput
          label='Вік:'
          value='age'
          onChange={handleChange}
          subType='age'
          id='user-info-age-id'
        />
      )}
      {phone ? (
        <Value value={phone} label='Phone' />
      ) : (
        <FormFieldNumInput
          label='Телефон: '
          value='phone'
          onChange={handleChange}
          subType='phone'
          id='user-info-phone-id'
        />
      )}
      {saveBtnRender()}
      {user?.role === "driver" && <DriverInformation />}
    </div>
  );
}
