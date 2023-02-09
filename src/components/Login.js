import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Alert from "./Alert";

const Login = (props) => {
  const history = useNavigate();
  const host = "http://localhost:5000";
  const [credential, setCredential] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    //API CALL:
    const response = await fetch(`${host}/api/user/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": " application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();

    if (json.status === "success") {
      localStorage.setItem("token", json.token);
      history("/");
      props.showAlert("Logged In successfully..", "success");
      //   console.log(localStorage);
      //   console.log(history);
    } else {
      props.showAlert("Please Login with correct detail", "danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3">
      <h2 className="my-2">Login to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credential.email}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credential.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
