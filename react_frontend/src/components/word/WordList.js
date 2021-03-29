import React from "react";
import Footer from "../footer/Footer";
import "./css/WordList.scss";

const WordList = ({ words }) => {
  return (
    <div className="wordContainer">
      <div className="wordBox">
        <div className="wordLogo">
          <img src="logo.png" alt="Logo" />
        </div>

        <div className="wordListBlock">
          <ul>
            {!words && (
              <li
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "gray",
                }}
              >
                등록된 단어가 없습니다
              </li>
            )}
            {words &&
              words.map((word) => (
                <li className="listInputZone" key={word.id}>
                  <input
                    className="wordListInput"
                    type="text"
                    value={word.eng}
                    disabled
                  />
                  <input
                    className="wordListInput"
                    type="text"
                    value={word.kor}
                    disabled
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WordList;
