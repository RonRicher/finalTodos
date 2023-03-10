import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { deleteCookie, getCookie } from "../js/cookie";

function NavBar() {
  const [userId, setUserId] = useState("");
  const {setUserNum, userNum} = useUser();


  useEffect(() => {
    setUserId(getCookie("userId"));
  });

  function logOut() {
    deleteCookie("userId");
    setUserNum("");
  }

  return (
    <header id="navBar">
      <div>
        <NavLink to={`users/${userId}/Info`}>Info</NavLink>
        <NavLink to={`users/${userId}/Todos`}>Todos</NavLink>
        <NavLink to={`users/${userId}/Posts`}>Posts</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
      {!userId && !userNum ? (
        <>
        <NavLink to="/login">LogIn</NavLink>
        <NavLink to="/register">Register</NavLink>
        </>
      ) : (
        <NavLink onClick={logOut} id="logOutButton" to="/login">
          Logout
        </NavLink>
      )}
    </header>
  );
}

export default NavBar;
