import React, { useState } from "react";
import { signUp } from "../Api/api";

const Signup = ({ open, haveAccount, setUser, socket}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    imagelink: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const register = () => {
    signUp(form.name, form.email, form.username, form.imagelink)
      .then((data) => {
        setUser(data.user);
        open(false);

      })
      .catch((error) => setError(error?.response?.data?.message));
  };

  return (
    <div style={{ width: "500px", height: "auto," }} className="py-5 px-3">
      <h2>Signup</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        ""
      )}

      <div className="mb-2">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={form?.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={form?.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={form?.username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="imagelink" className="form-label">
          Image Link (Optional)
        </label>
        <input
          type="text"
          className="form-control"
          id="imagelink"
          name="imagelink"
          placeholder="Enter an image link"
          value={form?.imagelink}
          onChange={handleChange}
        />
      </div>
      <p className="mt-2">
        Aleary have an account:{" "}
        <a
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: "500",
          }}
          onClick={() => haveAccount(true)}
        >
          Login
        </a>
      </p>
      <button type="button" className="btn btn-primary mt-2" onClick={register}>
        Signup
      </button>
    </div>
  );
};

export default Signup;
