import React, { Component, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCookie }  from "../js/cookie";
import Post from './Post';

function Posts() {
  const [posts, setPosts] = useState(null);
  const userId = getCookie("userId");

  const getPosts = async () => {
    if (!posts) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      const data = await res.json();
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
        posts.map((post, index) => (
          <>

          <NavLink key={post.id} to={`${post.id}`}>
              <Post key={index} title={post.title} body={post.body} postId={post.id}/>
            </NavLink>
          </>
        ))}
    </div>
  );
}

export default Posts;
