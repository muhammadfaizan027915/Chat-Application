import React, { useState } from "react";
import { logIn } from "../Api/api";

const Login = ({ open, haveAccount, setUser, socket }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    logIn(username, password)
      .then((data) => {
        setUser(data.user);
        open(false);
        window.location.reload();
      })
      .catch((error) => setError(error?.response?.data?.message));
  };

  return (
    <div style={{ width: "500px", height: "auto," }} className="py-5 px-3">
      <h2>Login</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        ""
      )}
      <div className="mb-2">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <p className="mt-2">
        Don't have an account:{" "}
        <a
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: "500",
          }}
          onClick={() => haveAccount(false)}
        >
          Signup
        </a>
      </p>
      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={handleClick}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
