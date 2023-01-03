import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({ username: "", password: "" });

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
    if (!user) return "User not found";
    console.log(user?.address?.geo?.lat);
    console.log(userInput.password);
    if (user?.address?.geo?.lat !== userInput.password) return "Wrong password";

    navigate("/");
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
