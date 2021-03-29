import client from "./apiClient";

// 로그인
export const login = ({ username, password }) =>
  client.post("/login", { username, password });

// 회원가입
export const register = ({ username, password, email }) =>
  client.post("/api/user/register", { username, password, email });

// 로그인 상태 확인
export const check = () => client.get("/api/auth/check");

// 로그아웃
export const logout = () => client.post("/api/auth/logout");
