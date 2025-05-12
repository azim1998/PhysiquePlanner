import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../Assets/weightlifting_icon.png";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <Link className="link" to={"/home"}>
        Home
      </Link>
      <Link className="link" to={"/exercises"}>
        Exercises
      </Link>
      <Link className="link login-link" to={"/login"}>
        Login
      </Link>
    </div>
  );
};

export default Navbar;
