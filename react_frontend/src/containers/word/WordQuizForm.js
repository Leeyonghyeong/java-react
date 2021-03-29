import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import WordQuiz from "../../components/word/WordQuiz";
import { listWords } from "../../modules/word";

const WordQuizForm = ({ history }) => {
  const dispatch = useDispatch();
  const { words, userid } = useSelector(({ auth, word }) => ({
    words: word.words,
    userid: auth.auth,
  }));

  useEffect(() => {
    dispatch(listWords(userid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!userid) {
      history.push("/");
    }
  }, [history, userid]);

  return <WordQuiz words={words} />;
};

export default withRouter(WordQuizForm);
