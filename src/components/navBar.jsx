import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand mx-5" to="/">
        BookHub
      </Link>
    </nav>
  );
};

export default NavBar;
