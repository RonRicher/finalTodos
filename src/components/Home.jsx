import React, { Component, useEffect, useState } from "react";
import { getCookie } from "../js/cookie";

function Home() {
  let userId = getCookie("userId");


  const [user, setUser] = useState({});
  const [className, setClassName] = useState('active');
  window.user = user;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!res.ok) throw new Error(res.message);

    const data = await res.json();
    setUser(data);
    return data;
  };

  return (
    <div className='main-content'>
      <div className='info'>
        <div className='inside-info'>
          <h1 >id: {user?.id}</h1>
          <h2>name: {user?.name}</h2>
          <h2>username: {user?.username}</h2>
          <h2>email: {user?.email}</h2>
          <h2>address: {user?.address?.city}</h2>
          <h2>phone: {user?.phone}</h2>
          <h2>company: {user?.company?.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
