import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Blog</h1>
      </Link>
      <div>
        <ul>
          <li>
            <Link to="/">
              <h1>Home</h1>
            </Link>
          </li>
          <li>
            <Link to="/createarticle">
              <h1>Create-Post</h1>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <h1>About</h1>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
