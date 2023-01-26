import { useState } from "react";
import { getCookie } from "../js/cookie";

function PostBlock(props) {

    const [userInput, setUserInput] = useState({
        field: "",

    });
    const userId = getCookie("userId");



    const getPosts = async () => {
        const res = await fetch(
            `http://localhost:8080/posts/addPost`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    description: userInput.field
                })
            }
        );
        if (!res.ok) throw new Error(res.message);
        props.setPostBlock(false);
    };



    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUserInput((prevUser) => ({ ...prevUser, [name]: value }));
        console.log(userInput.field);
    };



    return (<>



        <div>
            <button style={{ zIndex: 100, left: '25%', position: 'fixed' }} onClick={() => props.setPostBlock(false)}>x</button>

            <textarea onChange={handleChange}
                value={userInput.field}
                style={{ left: '25%', position: 'fixed' }}
                id="txtid" name="field" rows="10" cols="50">
                A nice day is a nice day.
                Lao Tseu
            </textarea>
            <button style={{ zIndex: 100, left: '45%', top: '65%', position: 'fixed' }} onClick={getPosts}>Share Post!</button>
        </div>


    </>);
}

export default PostBlock;