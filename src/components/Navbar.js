import React from "react";
import { Link } from "react-router-dom";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import RandomCocktail from "./RandomCocktail";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <Link to="/">
          <LocalBarIcon style={{ fontSize: "2rem", marginLeft: "1rem" }} />{" "}
          Cocktails Database
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/"> Search</Link>
            <RandomCocktail />
            <Link to="/favourite"> Favourite</Link>
            <Link to="/about"> About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
