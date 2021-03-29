import React, { useState } from "react";
import { useEffect } from "react";
import Footer from "../footer/Footer";
import "./css/WordQuiz.scss";

const WordQuiz = ({ words }) => {
  const [quiz, setQuiz] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerCount, setAnswerCount] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [input, setInput] = useState("");

  const nullObject = words ? true : false;

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const answerInput = input;
    if (answer === answerInput) {
      setAnswerCount(answerCount + 1);
    } else {
      setWrong(wrong + 1);
    }
  };

  useEffect(() => {
    if (nullObject) {
      const randomInt = Math.floor(Math.random() * words.length);
      setQuiz("Quiz : " + words[randomInt].kor);
      setAnswer(words[randomInt].eng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrong, answerCount]);

  return (
    <div className="wordContainer">
      <div className="wordBox">
        <div className="wordLogo">
          <img src="logo.png" alt="Logo" />
        </div>
        <form onSubmit={onSubmit}>
          <div className="wordInput">
            <input
              type="text"
              className="StyledInput fullWidth"
              value={quiz}
              name="quiz"
              autoComplete="off"
              placeholder={!nullObject && "등록하신 단어가 없습니다"}
              disabled
            />
            <input
              type="text"
              className="StyledInput fullWidth"
              placeholder="정답을 입력해 주세요"
              name="answer"
              autoComplete="off"
              value={input}
              onChange={onChange}
            />
          </div>
          <div className="wordButton">
            <button type="submit" className="StyledButton fullWidth cyan">
              확인
            </button>
          </div>
        </form>
        <div className="quizResult">
          <div className="answerCount">정답 : {answerCount}</div>
          <div className="wrongCount">오답 : {wrong}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WordQuiz;
