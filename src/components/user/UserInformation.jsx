import { Container } from "bootstrap-4-react/lib/components/layout";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

export default function UserInformation() {
  const { user } = useContext(AuthContext);
  const { age, email, name, role } = user;
  return (
    <Container
      display='flex'
      flex='column'
      justifyContent='space-between'
      alignItems='flex-start'
    >
      {name && (
        <span>
          Name: <b>{name}</b>
        </span>
      )}
      {email && (
        <span>
          Email: <b>{email}</b>
        </span>
      )}
      {age && (
        <span>
          Age: <b>{age}</b>
        </span>
      )}
      {role && (
        <span>
          Role: <b>{role}</b>
        </span>
      )}
    </Container>
  );
}
