import React, { Component, useEffect, useState } from "react";
import { useStateRef } from "../hooks/useStateRef";
import { getCookie } from "../js/cookie";

function Info() {
  let userId = getCookie("userId");
  const [user, setUser, userRef] = useStateRef(null);

  useEffect(() => {
    window.onbeforeunload = toLocalStorage;
    const localUserInfo = localStorage.getItem('localUserInfo');
    if (localUserInfo) {
      setUser(JSON.parse(localUserInfo));
      // console.log(111111)
    }
    else {
      getUser()
      console.log(2222222)
    }
    return () => {
      toLocalStorage();

    }
  }, [])


  const getUser = async () => {
    let userId = getCookie("userId");
    const res = await fetch("http://localhost:8080/users/userInfo", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_id: userId})
    })
    
    if (!res.ok) throw new Error(res.message);
    const data = await res.json();
    const objData = await data[0]
    setUser(objData);
    return objData;
  };

  function toLocalStorage() {
    localStorage.setItem('localUserInfo', JSON.stringify(userRef.current));
  }

  return (
    <div className='main-content'>
      <div className='info'>
        <div className='inside-info'>
          {/* <img className='profile-pic'
            src='https://images.pexels.com/photos/220454/pexels-photo-220454.jpeg?auto=compress&cs=tinysrgb&h=200'
            alt='' /> */}
          <h2>First name: {user?.first_name}</h2>
          <h2>Last name: {user?.last_name}</h2>
          <h2>Username: {user?.username}</h2>
          <h2>Email: {user?.email}</h2>
          <h2>Phone: {user?.phone}</h2>
        </div>
      </div>
    </div>
  );
}

export default Info;
