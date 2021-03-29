import client from "./apiClient";

// 단어 등록
export const wordAdd = ({ eng, kor, userid }) =>
  client.post("/api/word/add", { eng, kor, userid });

// 단어 리스트
export const listWord = ({ userid }) => client.get(`/api/word/list/${userid}`);
