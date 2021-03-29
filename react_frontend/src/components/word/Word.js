import React from "react";
import Footer from "../footer/Footer";
import "./css/Word.scss";

const Word = ({ form, onChange, onSubmit, wordList }) => {
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
              placeholder="영어단어"
              name="eng"
              autoComplete="off"
              onChange={onChange}
              value={form.eng}
            />
            <input
              type="text"
              className="StyledInput fullWidth"
              placeholder="한글 뜻"
              name="kor"
              autoComplete="off"
              onChange={onChange}
              value={form.kor}
            />
          </div>
          <div className="wordButton">
            <button type="submit" className="StyledButton fullWidth cyan">
              등록
            </button>
          </div>
        </form>

        <div className="wordList">
          <ul>
            {wordList.map((word, index) => (
              <li key={index}>
                {word.eng} : {word.kor}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Word;
