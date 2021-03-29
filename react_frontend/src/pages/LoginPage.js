import React from "react";
import Auth from "../components/user/Auth";
import LoginForm from "../containers/user/LoginForm";

const LoginPage = () => {
  return (
    <Auth>
      <LoginForm />
    </Auth>
  );
};

export default LoginPage;
