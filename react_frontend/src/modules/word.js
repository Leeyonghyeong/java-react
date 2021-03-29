import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import * as wordAPI from "../lib/api/apiWord";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const CHANGE_FIELD = "word/CHANGE_FIELD";
const INITIALIZE_FORM = "word/INITIALIZE_FORM";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  "word/REGISTER"
);

const [
  LIST_WORDS,
  LIST_WORDS_SUCCESS,
  LIST_WORDS_FAILURE,
] = createRequestActionTypes("word/LIST_WORDS");

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // wordForm
    key, // eng, kor
    value, // 실제 바꾸려는 값
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // register, login 폼 초기화

export const register = createAction(REGISTER, ({ eng, kor, userid }) => ({
  eng,
  kor,
  userid,
}));

export const listWords = createAction(LIST_WORDS, (userid) => ({
  userid,
}));

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, wordAPI.wordAdd);
const listWordsSaga = createRequestSaga(LIST_WORDS, wordAPI.listWord);

export function* wordSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LIST_WORDS, listWordsSaga);
}

const initialState = {
  register: {
    eng: "",
    kor: "",
  },
  words: null,
  wordError: null,
};

const word = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // ex) state.register.eng 을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    // 단어 등록 성공
    [REGISTER_SUCCESS]: (state, { payload: word }) => ({
      ...state,
      wordError: null,
      word,
    }),
    // 단어 등록 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      wordError: error,
    }),
    // 단어리스트 불러오기 성공
    [LIST_WORDS_SUCCESS]: (state, { payload: words }) => ({
      ...state,
      words,
    }),
    // 단어리스트 불러오기 실패
    [LIST_WORDS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      wordError: error,
    }),
  },
  initialState
);

export default word;
