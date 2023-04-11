import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import { GlobalContext } from "../../context/global/GlobalContext";

import { AdminMenuLinks, UserMenuLinks } from "../../routes/links";

import "./styles/sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useContext(GlobalContext);
  const menuLinks = user?.role === "admin" ? AdminMenuLinks : UserMenuLinks;
  const [open, setOpen] = useState(true);
  const trigger = () => {
    setOpen(!open);
  };
  return (
    <div className={`sidebar-wrapper ${open ? "open" : ""}`}>
      <div className='burger' onClick={trigger}>
        <FaBars size={36} cursor='pointer' />
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
