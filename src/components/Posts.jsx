import React, { Component, useEffect, useState } from 'react';
import { getCookie } from './cookie';
import Post from './Post';

function Posts() {

  const [posts, setPosts] = useState(null);
  const userId =   getCookie('userId');

  const getPosts = async () => {
    if (!posts) {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const data = await res.json();
      console.log(data)
      setPosts(data)
      return data;
    }

  }

  useEffect(() => { getPosts() }
    , [])

  return (

    <div className='main-content'>
      <h1>Posts</h1>
      {posts && posts.map(post => <Post key={post.id} postId={post.id} title={post.title} body={post.body} />)}

    </div>
  );
}

export default Posts;
