import logo from "../assets/images/react-logo.png";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Header(props) {
  const navigate = useNavigate();

  const userLoggedIn =
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    if (localStorage.getItem("user_data")) {
      localStorage.removeItem("user_data");
    }

    navigate("/", { replace: true });
  };

  return (
    <nav className="nav-bar">
      <p>
        <img src={logo} alt="logo" height="40" />
      </p>
      <ul>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact-us">Contact</a>
        </li>
        {userLoggedIn && (
          <li>
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
