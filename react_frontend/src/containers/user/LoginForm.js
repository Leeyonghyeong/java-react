import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import AuthForm from "../../components/user/AuthForm";
import {
  changeField,
  initializeForm,
  initializeSign,
  login,
} from "../../modules/auth";

const LoginForm = ({ history }) => {
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  // 컴포넌트가 처음 렌더링될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm("login"));
    dispatch(initializeSign());
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError("아이디 또는 비밀번호가 맞지 않습니다");
      return;
    }
  }, [authError, dispatch]);

  useEffect(() => {
    if (auth) {
      history.push("/word");

      try {
        localStorage.setItem("user", JSON.stringify(auth));
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [history, auth]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginForm);
