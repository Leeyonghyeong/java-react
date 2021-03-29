import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { takeLatest } from "redux-saga/effects";
import * as authAPI from "../lib/api/apiAuth";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const INITIALIZE_SIGN = "auth/INITIALIZE_SIGN";

const CHECK = "auth/CHECK";

const LOGOUT = "auth/LOGOUT";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  "auth/REGISTER"
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  "auth/LOGIN"
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register, login
    key, // username, password, passwordConfirm, email
    value, // 실제 바꾸려는 값
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form); // register, login 폼 초기화
export const initializeSign = createAction(INITIALIZE_SIGN); // register, login 폼 초기화

export const register = createAction(
  REGISTER,
  ({ username, password, email }) => ({
    username,
    password,
    email,
  })
);

export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

export const check = createAction(CHECK, (user) => user);

export const logout = createAction(LOGOUT);

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
    email: "",
  },
  login: {
    username: "",
    password: "",
  },
  sign: null,
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // ex) state.register.username 을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [INITIALIZE_SIGN]: (state) => ({
      ...state,
      sign: initialState["sign"],
    }),
    //회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: sign }) => ({
      ...state,
      authError: null,
      sign,
    }),
    //회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    //로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    //로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 유저 정보 체크
    [CHECK]: (state, { payload: user }) => ({
      ...state,
      auth: user,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      auth: null,
    }),
  },
  initialState
);

export default auth;
