import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import WordList from "../../components/word/WordList";
import { listWords } from "../../modules/word";

const WordListForm = ({ history }) => {
  const dispatch = useDispatch();
  const { words, wordError, userid } = useSelector(({ auth, word }) => ({
    words: word.words,
    wordError: word.wordError,
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

  return <WordList words={words} error={wordError} />;
};

export default withRouter(WordListForm);
