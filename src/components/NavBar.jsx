import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header id="navBar">
      <div>
        <NavLink to="/Login">LogIn</NavLink>
        <NavLink to="/Info">Info</NavLink>
        <NavLink to="/Todos">Todos</NavLink>
        <NavLink to="/Posts">Posts</NavLink>
        <NavLink to="/Albums">Albums</NavLink>
      </div>
      <NavLink id="logOutButton" to="/">
        Logout
      </NavLink>
    </header>
  );
}

export default NavBar;
