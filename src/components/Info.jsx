import React, { Component, useEffect, useState } from 'react';

function Info() {
  const [user, setUser] = useState({});
  // const {id} = 'getUser()';
  const id = 1;
  window.user = user

  const getUser = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await res.json();
    console.log(data)
    setUser(data)
    return data;
  }

  useEffect(() => {
    getUser()
  }, [])
  // setUserInfo(userInfoFunc());
  // console.log(userInfo)


  return (
    <>
      <br />
      <br />
      <br />
      <h1>id: {user?.id}</h1>
      <h2>name: {user?.name}</h2>
      <h2>username: {user?.username}</h2>
      <h2>email: {user?.email}</h2>
      <h2>address: {user?.address?.city}</h2>
      <h2>phone: {user?.phone}</h2>
      <h2>company: {user?.company?.name}</h2>
    </>

  );
}

export default Info;