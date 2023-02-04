import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import AuthForm from "./component/Authentication/AuthForm";
import { useSelector } from "react-redux";
import Header from "./component/Layout/Header";
import ForgotPassword from "./component/Authentication/ForgotPassword";

function App() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  return (
    <Switch>
      <Route path="/" exact>
        {!isAuthenticated && <AuthForm />}
        {isAuthenticated && <Header/>}
      </Route>
      <Route path="/forgot">
        <ForgotPassword/>
      </Route>
    </Switch>
  );
}

export default App;
