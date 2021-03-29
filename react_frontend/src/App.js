import React from "react";
import { Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WordListPage from "./pages/WordListPage";
import WordPage from "./pages/WordPage";
import WordQuizPage from "./pages/WordQuizPage";

const App = () => {
  return (
    <>
      <Route path="/" component={LoginPage} exact />
      <Route path="/register" component={RegisterPage} />
      <Route path="/word" component={WordPage} />
      <Route path="/list" component={WordListPage} />
      <Route path="/quiz" component={WordQuizPage} />
    </>
  );
};

export default App;
