import React, { Component, useEffect, useState } from 'react';
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { usePost } from '../context/PostContext';
import { getCookie } from "../js/cookie";


function Comments() {
    const { postObj } = usePost();
    const navigate = useNavigate();
    
    const [comments, setComments] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getComments()
    }
        , [])

    const getComments = async () => {
        if (!comments) {
            const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
            const data = await res.json();
            setComments(data);
            console.log('jhh')
            return data;
        }
    }



    return (
        <div className='main-content'>
            <h2>{postObj.title}</h2>
            {/* <h3>{postObj.postId}</h3> */}
            <p>{postObj.body}</p>
            {
                comments && comments.map(comment =>
                    <div key={comment.id}>
                        <h6>{comment.name}</h6>
                        <p>{comment.body}</p>
                    </div>)
            }
            <button onClick={() => navigate(`/Users/${id}/Posts`)}>go back</button>
        </div>);
}

export default Comments;
