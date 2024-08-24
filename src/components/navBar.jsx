import React from "react";
import { Link } from "react-router-dom";
import "../css/styles.css";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-color">
      <Link className="container ml-lg-5 navbar-brand " to="/">
        BookHub
      </Link>
    </nav>
  );
};

export default NavBar;
