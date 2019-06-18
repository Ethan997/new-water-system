import React from "react";
import ReactDOM from "react-dom";
// import { Router, Route, Link, IndexRoute, hashHistory } from "react-router";
import {HashRouter, Route, hashHistory} from 'react-router-dom';
import Manage from "./containers/Manage";
import Login from "./containers/Login";
import Apply from "./containers/Apply";
import "./index.css";

ReactDOM.render((
  <HashRouter history={hashHistory}>
    <Route path="/" component={Login}>
      <Route path="/login" component={Login} />
      <Route path="/apply" component={Apply} />
      <Route path="/manage" component={Manage} />
    </Route>
  </HashRouter>
),
  document.getElementById("root")
);
