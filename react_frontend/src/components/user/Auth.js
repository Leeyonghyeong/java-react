import React from "react";
import "./css/Login.scss";

const Login = ({ children }) => {
  return (
    <>
      <div className="loginContainer">
        <div className="loginBox">{children}</div>
      </div>
    </>
  );
};

export default Login;
