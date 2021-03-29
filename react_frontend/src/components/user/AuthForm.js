import React from "react";
import { Link } from "react-router-dom";

const userForm = ({ type, form, onChange, onSubmit, error }) => {
  return (
    <>
      <div className="loginLogo">
        <img src="logo.png" alt="Logo" />
      </div>

      <form onSubmit={onSubmit}>
        <div className="loginInput">
          <input
            className="StyledInput"
            type="text"
            name="username"
            placeholder="아이디"
            autoComplete="off"
            onChange={onChange}
            value={form.username}
          />
          <input
            className="StyledInput"
            type="password"
            name="password"
            placeholder="비밀번호"
            autoComplete="off"
            onChange={onChange}
            value={form.password}
          />

          {type === "register" && (
            <>
              <input
                className="StyledInput"
                type="password"
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                autoComplete="off"
                onChange={onChange}
                value={form.passwordConfirm}
              />

              <input
                className="StyledInput"
                type="text"
                name="email"
                placeholder="이메일"
                autoComplete="off"
                onChange={onChange}
                value={form.email}
              />
            </>
          )}
          {error && <div className="ErrorMessage">{error}</div>}
        </div>

        <div className="loginButton">
          {type === "login" ? (
            <>
              <button type="submit" className="StyledButton fullWidth cyan">
                로그인
              </button>
              <Link className="StyledButton fullWidth" to="/register">
                회원가입
              </Link>
            </>
          ) : (
            <>
              <button type="submit" className="StyledButton fullWidth cyan">
                회원가입
              </button>
              <Link className="StyledButton fullWidth" to="/">
                취소
              </Link>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default userForm;
