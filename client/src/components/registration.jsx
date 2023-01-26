import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../js/cookie";
import { useUser } from "../context/UserContext";

const Register = () => {
  const { setUserNum } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });
  
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInput((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    // const response = await validateUser(await getUser(userInput.username));
    // console.log(response);

    const response = await registerUser(userInput);
    if(response){
        alert("You have registered successfully")
        navigate("/login")
    } else {
        alert("You're email has already been registered, please use a different email")
    }
    console.log(response);
  };

  const registerUser = async (formInput) => {
    try {
        const res = await fetch("http://localhost:8080/users/registration", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: formInput.firstName,
                last_name: formInput.lastName,
                email: formInput.email,
                phone: formInput.phone,
                username: formInput.username,
                password: formInput.password
            })
        })
        // let response = await res
        return res;    
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <>
      <div className="login-wrapper">
        <div className="container main">
          <div className="row">
            <div className="col-md-6 signin-image">
              <div className="text"></div>
            </div>

            <form
              className={
                loading === false ? "col-md-6 right" : "col-md-6 input-loading"
              }
              onSubmit={handleSubmit}
            >
              <div className="input-box">
                <header>Registration</header>
                <h1>Please enter the forms to register</h1>
                <div className="input-field">
                  <input
                    type="text"
                    name="username"
                    className={loading === false ? "input" : "input wait"}
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
                    className={loading === false ? "input" : "input wait"}
                    id="password"
                    onChange={handleChange}
                    value={userInput.password}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    name="firstName"
                    className={loading === false ? "input" : "input wait"}
                    id="firstName"
                    onChange={handleChange}
                    value={userInput.firstName}
                    required
                  />
                  <label htmlFor="firstName">First name</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    name="lastName"
                    className={loading === false ? "input" : "input wait"}
                    id="lastName"
                    onChange={handleChange}
                    value={userInput.lastName}
                    required
                  />
                  <label htmlFor="lastName">Last name</label>
                </div>
                <div className="input-field">
                  <input
                    type="email"
                    name="email"
                    className={loading === false ? "input" : "input wait"}
                    id="email"
                    onChange={handleChange}
                    value={userInput.email}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    name="phone"
                    className={loading === false ? "input" : "input wait"}
                    id="phone"
                    onChange={handleChange}
                    value={userInput.phone}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                  />
                  <label htmlFor="phone">Phone number</label>
                </div>
                <div className="input-field">
                  <input
                    type="submit"
                    className={loading === false ? "submit" : "loading"}
                    value={loading === false ? "Register" : "Loading..."}
                  />
                </div>
                <p id="response-text">{errorMessage}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
