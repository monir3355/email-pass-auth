import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="text-center p-5">
      <Link className="px-3" to="/">
        Home
      </Link>
      <Link className="px-3" to="/login">
        Login
      </Link>
      <Link className="px-3" to="/register">
        Register
      </Link>
    </nav>
  );
};

export default Header;
