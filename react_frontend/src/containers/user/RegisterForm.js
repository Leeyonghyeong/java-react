import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import AuthForm from "../../components/user/AuthForm";
import { changeField, initializeForm, register } from "../../modules/auth";

function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { form, sign, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    sign: auth.sign,
    auth: auth.auth,
    authError: auth.authError,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "register",
        key: name,
        value,
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm, email } = form;

    if ([username, password, passwordConfirm, email].includes("")) {
      setError("빈 칸을 모두 입력하세요");
      return;
    }

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다");
      dispatch(changeField({ form: "register", key: "password", value: "" }));
      dispatch(
        changeField({ form: "register", key: "passwordConfirm", value: "" })
      );
      return;
    }

    if (!validateEmail(email)) {
      setError("올바른 이메일 형식이 아닙니다");
      dispatch(changeField({ form: "register", key: "email", value: "" }));
      return;
    }

    dispatch(register({ username, password, email }));
  };

  // 컴포넌트가 처음 렌더링될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      // 이미 계정이 존재 할때
      if (authError.response.status === 409) {
        setError("이미 존재하는 아이디 입니다");
        return;
      }

      // 기타 이유
      setError("회원가입 실패. 관리자에게 문의 하세요");
      return;
    }

    if (sign) {
      history.push("/");
    }

    if (auth) {
      history.push("/word");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, sign, authError, dispatch]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
