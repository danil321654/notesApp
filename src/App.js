import {useState, useEffect} from "react";
import {createBrowserHistory} from "history";

import axios from "axios";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Login from "./auth/components/Login";
import Notes from "./notes/components/Notes";
import {checkLogin} from "./auth/actions/checkLogin";
const history = createBrowserHistory({forceRefresh: true});

function App({state, checkLogin}) {
  useEffect(() => {
    checkLogin(state.auth.token);
  }, []);

  return (
    <BrowserRouter>
      <Route path="/login" component={Login} />
      <Route path="/notes" component={Notes} />
      <Route path="/">
        <Redirect to={state.auth.isLoggedIn ? "/notes" : "/login"} />
      </Route>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    state: state
  };
};

const mapDispatchToProps = {
  checkLogin: checkLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
