import React, { Component, useEffect, useState } from 'react';


function Post({ title, body, postId }) {

    const [comments, setComments] = useState(null);


    const getComments = async () => {
        if (!comments) {
            const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
            const data = await res.json();
            setComments(data)
            console.log(data)
            return data;
        }

    }

    useEffect(() => { getComments() }
        , [])





    return (
    <div className='main-content'>
        <h2>{title}</h2>
        <h3>{postId}</h3>
        <p>{body}</p>

        {comments && comments.map(comment => <div><h6>{comment.name}</h6><p>{comment.body}</p></div>)}
        {/* <p>{comments?.name}</p>
        <p>{comments?.body}</p> */}
    </div>);
}

export default Post;
