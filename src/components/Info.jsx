import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCookie } from './cookie';


function Info() {
  let userId =   getCookie('userId');
  const [user, setUser] = useState({});
  const [className, setClassName] = useState('active'); 
  // const {id} = 'getUser()';

  console.log('new', userId)
  // const id = 1;
  window.user = user

  const getUser = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
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

  function changeClass(){
    className === 'active' ? setClassName('none'):setClassName('active');  
  }

  return (
    <div className='main-content'>
      <div className='info'>
      <div className='inside-info'>

      <h1 className={className} onClick={changeClass}>id: {user?.id}</h1>
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

export default Info;