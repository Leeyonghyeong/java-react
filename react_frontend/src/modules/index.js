import { combineReducers } from "redux";
import auth, { authSaga } from "./auth";
import loading from "./loading";
import { all } from "redux-saga/effects";
import word, { wordSaga } from "./word";

const rootReducer = combineReducers({
  auth,
  loading,
  word,
});

export function* rootSaga() {
  yield all([authSaga(), wordSaga()]);
}

export default rootReducer;
