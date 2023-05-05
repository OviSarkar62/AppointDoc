import { message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // rendering menu list
  const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;

  return (
    <>
      <div className={`main ${isDarkMode ? "dark" : ""}`}>
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>AppointDoc</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.name}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className="menu-item" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
              
                  <i className="fa-solid fa-bell"></i>
          
                <Link to="/profile">{user?.name}</Link>
              </div>
              <button onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </button>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
