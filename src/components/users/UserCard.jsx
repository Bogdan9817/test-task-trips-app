import { Form, InputGroup, Button } from "bootstrap-4-react/lib/components";
import "./styles/user-card.css";
import { useContext, useState } from "react";
import { updateUserRole } from "../../api/admin";
import { AdminContext } from "../../context/admin/AdminContext";
import AlertMessage from "../../UI/alert-message/AlertMessage";

export default function UserCard({ email, name, age, role, uid }) {
  const [chosenRole, setChosenRole] = useState(role);
  const [error, setError] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);
  const { dispatch } = useContext(AdminContext);
  const handleChange = (e) => {
    setChosenRole(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateUserRole(chosenRole, uid);
      dispatch({
        type: "UPDATE_USER_ROLE",
        payload: {
          role: chosenRole,
          uid,
        },
      });
      setAlertMsg({ message: "User updated!", type: "success" });
      setTimeout(() => {
        setAlertMsg(null);
      }, 6000);
    } catch (e) {
      setError(e.message);
      setAlertMsg({
        message: "Something went wrong, try later :( ",
        type: "danger",
      });
    }
  };

  return (
    <div className='user-card-data'>
      {email && <span>Email: {email}</span>}
      {name && <span>Name: {name}</span>}
      {age && <span>Age: {age}</span>}
      <InputGroup my='1'>
        <Form.CustomSelect onChange={handleChange} defaultValue={chosenRole}>
          <option>passenger</option>
          <option>driver</option>
          <option>dispatcher</option>
        </Form.CustomSelect>
        <Button onClick={handleSave} dark>
          save
        </Button>
      </InputGroup>
      <div className='alert-message-container'>
        <AlertMessage {...alertMsg} />
      </div>
    </div>
  );
}
