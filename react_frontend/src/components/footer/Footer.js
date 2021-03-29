import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../modules/auth";
import "./css/Footer.scss";

const Footer = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };
  return (
    <div className="footer">
      <div className="footerButtonBox">
        <div className="footerButton">
          <Link to="/list">내 단어장</Link>
        </div>
        <div className="footerButton">
          <Link to="/word">단어추가</Link>
        </div>
        <div className="footerButton">
          <Link to="/quiz">단어퀴즈</Link>
        </div>
        <div className="footerButton" onClick={onLogout}>
          로그아웃
        </div>
      </div>
    </div>
  );
};

export default Footer;
