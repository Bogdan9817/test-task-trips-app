import { useContext, useState } from "react";
import { Button } from "bootstrap-4-react";

import { deleteUser, updateUserRole } from "../../api/admin";

import { AdminContext } from "../../context/admin/AdminContext";

import FormFieldSelector from "../../UI/form-field-selector/FormFieldSelector";

import "./styles/user-card.css";
import { GlobalContext } from "../../context/global/GlobalContext";
import Value from "../../UI/value/Value";

import text from "./text.json";
import Loader from "../../UI/loader/Loader";

export default function UserCard({ email, name, age, role, uid }) {
  const { setErrors, setSuccessMsg } = useContext(GlobalContext);
  const { dispatch } = useContext(AdminContext);
  const [chosenRole, setChosenRole] = useState(role);
  const [load, setLoad] = useState(false);
  const { roleUpdated, userDeleted } = text.userCard.success;
  const { others } = text.userCard.errors;
  const handleChange = (e) => {
    setChosenRole(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      await deleteUser(uid);
      setSuccessMsg(userDeleted);
      dispatch({ type: "DELETE_USER", payload: { uid } });
    } catch (e) {
      setErrors([others]);
    }
    setLoad(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      await updateUserRole(chosenRole, uid);
      dispatch({
        type: "UPDATE_USER_ROLE",
        payload: {
          role: chosenRole,
          uid,
        },
      });
      setSuccessMsg(roleUpdated + " " + name);
    } catch (e) {
      setErrors([others]);
    }
    setLoad(false);
  };

  if (load) {
    return <Loader />;
  }

  return (
    <div className='user-card-data'>
      {email && <Value label='email' value={email} />}
      {email && <Value label='Імя' value={name} />}
      {email && <Value label='Вік' value={age} />}
      <div>
        <FormFieldSelector
          label='Роль'
          value={role}
          allowedValues={text.userCard.selectorValues}
          onChange={handleChange}
          id='admin-role-selector-id'
          defaultValue={chosenRole}
        />
        <div className='btns-container'>
          <Button onClick={handleSave} dark>
            {text.userCard.updateRoleBtn}
          </Button>
          <Button onClick={handleDelete} danger>
            {text.userCard.deleteUserBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}
