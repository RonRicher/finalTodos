import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { setCookie } from "../js/cookie";

const Login = () => {
  const navigate = useNavigate();
  const { setUserId } = useUser();
  const [userInput, setUserInput] = useState({
    username: "Bret",
    password: "-37.3159",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUserInput((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await validateUser(await getUser(userInput.username));
    console.log(response);
  };

  const getUser = async (username) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users?username=${username}`
    );
    const data = await res.json();
    return data[0];
  };

  const validateUser = async (user) => {
    console.log("user: ", user);
    if (!user) return "User not found";
    console.log(user?.address?.geo?.lat);
    console.log(userInput.password);
    if (user?.address?.geo?.lat !== userInput.password) return "Wrong password";
    setUserId(user.id);
    localStorage.setItem("userId", user.id);
    setCookie("userId", user.id, 1);
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = window.history.go(1);
    navigate(`/`);
  };

  return (
    <>
      <div className="wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 signin-image">
              <div className="text">
                <p>Welcome</p>
              </div>
            </div>

            <form className="col-md-6 right" onSubmit={handleSubmit}>
              <div className="input-box">
                <header>Log In</header>
                <div className="input-field">
                  <input
                    type="text"
                    name="username"
                    className="input"
                    id="username"
                    onChange={handleChange}
                    value={userInput.username}
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    name="password"
                    className="input"
                    id="password"
                    onChange={handleChange}
                    value={userInput.password}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field">
                  <input type="submit" className="submit" value="Login" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
