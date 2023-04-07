import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import "./styles/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import { AdminMenuLinks, UserMenuLinks } from "../../routes";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const menuLinks = user?.role === "admin" ? AdminMenuLinks : UserMenuLinks;
  const [open, setOpen] = useState(true);
  const trigger = () => {
    setOpen(!open);
  };
  return (
    <div className={`sidebar-wrapper ${open ? "open" : ""}`}>
      <div className='burger'>
        <FaBars size={36} cursor='pointer' onClick={trigger} />
      </div>
      <div className={`sidebar-content ${open ? "open" : ""}`}>
        <div className='menu-links'>
          {menuLinks.map((el) => {
            return (
              <Link
                key={el.id}
                className={`menu-link ${
                  el.path === location.pathname ? "current" : ""
                }`}
                to={el.path}
              >
                {el.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
