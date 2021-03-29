import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import rootReducer, { rootSaga } from "./modules/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { check } from "./modules/auth";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

function userCheck() {
  try {
    const user = localStorage.getItem("user");
    if (!user) return;

    store.dispatch(check(user));
  } catch (e) {
    console.log("localStorage is not working");
  }
}

userCheck();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
