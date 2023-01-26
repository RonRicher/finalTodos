import React, { Component, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePost } from "../context/PostContext";
import { getCookie } from "../js/cookie";
import Post from "./Post";
import PostBlock from "./PostBlock";

function Posts() {
  const [posts, setPosts] = useState(null);
  const userId = getCookie("userId");
  const { setPostObj } = usePost();
  const [postBlock, setPostBlock] = useState(false);

  const getPosts = async () => {
    if (!posts) {
      const res = await fetch(
        `http://localhost:8080/posts/showPosts/${userId}`
      );
      if (!res.ok) throw new Error(res.message);

      const data = await res.json();
      setPosts(data);
      return data;
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  function changeContext(index) {
    setPostObj({
      title: posts[index].title,
      // body: posts[index].body,
      postId: posts[index].postId,
    });
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className="main-content">
        <div style={postBlock ? { opacity: 0.3, backgroundColor: 'gray' } : {}}>
          <h1 style={{ marginTop: 50 }}>Posts</h1>

          {posts &&
            posts.map((post, index) => (
              <NavLink
                onClick={() => changeContext(index)}
                key={post.id}
                to={`${post.id}`}
              >
                <Post
                  key={index}
                  title={post.title}
                  // body={post.body}
                  postId={post.id}
                />
              </NavLink>
            ))}
        </div>
      </div>
      <div style={{ position: 'absolute', top: '15%', left: '42%' }}>
        <button style={postBlock ? { display: 'none' } : {}} onClick={() => setPostBlock(true)}>Add A new Post</button>
        <div id="postBlock" style={postBlock ? { display: "block" } : { display: "none" }}> <PostBlock setPosts={setPosts} setPostBlock={setPostBlock} /></div>
      </div>
    </div>
  );
}

export default Posts;
