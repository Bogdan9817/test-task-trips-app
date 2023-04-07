import { Display3 } from "bootstrap-4-react";
import UserInformation from "../../components/user/UserInformation";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

function UserInfoPage() {
  const { user } = useContext(AuthContext);
  return (
    <div className='content-wrapper'>
      <Display3>{user.name}`s Information</Display3>
      <UserInformation />
    </div>
  );
}

export default UserInfoPage;
