import React, { Component, useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { getCookie } from "../js/cookie";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState(null);
  const userId = getCookie("userId");

  const getPosts = async () => {
    if (!posts) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      const data = await res.json();
      console.log(data);
      setPosts(data);
      return data;
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="main-content">
      <h1>Posts</h1>
      {posts &&
        posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            title={post.title}
            body={post.body}
          />
        ))}
    </div>
  );
}

export default Posts;

/*{
    import React, { Component, useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';


function Info() {
  const [user, setUser] = useState({});
  // const {id} = 'getUser()';
  const {userId} = useUser();
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
}*/
