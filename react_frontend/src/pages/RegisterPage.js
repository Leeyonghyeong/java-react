import React from "react";
import Auth from "../components/user/Auth";
import RegisterForm from "../containers/user/RegisterForm";

const RegisterPage = () => {
  return (
    <Auth>
      <RegisterForm />
    </Auth>
  );
};

export default RegisterPage;
