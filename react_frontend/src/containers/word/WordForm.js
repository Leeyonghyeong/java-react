import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import Word from "../../components/word/Word";
import { changeField, initializeForm, register } from "../../modules/word";

const WordForm = ({ history }) => {
  const [wordList, setWordList] = useState([]);

  const dispatch = useDispatch();
  const { form, userid } = useSelector(({ word, auth }) => ({
    form: word.register,
    userid: auth.auth,
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
    const { eng, kor } = form;

    if ([eng, kor].includes("")) {
      return;
    }

    dispatch(register({ eng, kor, userid }));

    const nextWordList = wordList.concat({
      eng: eng,
      kor: kor,
    });
    setWordList(nextWordList);
  };

  useEffect(() => {
    dispatch(initializeForm("register"));
  }, [dispatch, wordList]);

  useEffect(() => {
    if (!userid) {
      history.push("/");
    }
  }, [history, userid]);

  return (
    <Word
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      wordList={wordList}
    />
  );
};

export default withRouter(WordForm);
