import React from "react";
import Button from "./utilities/Button";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Login = ({ onlogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter all the fields");
    }

    // call function to fetch
    const ret = await onlogin({ email, password })
    console.log(ret)
    setSubmit(ret);

  };

  return (
    <div className="create shadow-lg p-3 mb-5 bg-white rounded">
      <h2>Login</h2>
      <label>Email: </label>
      <input
        type="text"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <label>Password: </label>
      <input
        type="password"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button btn_type="success" text="Login" type="submit" onCick={onSubmit} />
      <br />
      <Link to="/sign-up">SignUp</Link>
      {submit ? <Redirect to="/" /> : " "}
    </div>
  );
};

export default Login;
