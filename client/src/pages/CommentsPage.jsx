import React, { Component, useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { usePost } from "../context/PostContext";


function Comments() {
  const { postObj } = usePost();
  const navigate = useNavigate();

  const [comments, setComments] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    if (!comments) {
      try {
        const res = await fetch(
          `http://localhost:8080/comments/showComments/${postId}`
        );
        if (!res.ok) throw new Error(res.message);
        const data = await res.json();
        setComments(data);
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <div className="main-content">
      <h2 style={{ marginTop: 50 }}>{postObj.title}</h2>
      {comments &&
        comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <h6>{comment.userName}</h6>
            <p>{comment.body}</p>
          </div>
        ))}
      <button onClick={() => navigate(`/Users/${postId}/Posts`)}>go back</button>
    </div>
  );
}

export default Comments;
