import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "./components/Layout";
import Alert from "./components/Alert/Alert";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PrivateRout from "./components/PrivateRout";
import Dashboard from "./components/Dashboard";
const Router = props => {
  return (
    <BrowserRouter>
      <Menu />
      <Fragment>
        <Alert />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRout path="/dashboard" component={Dashboard} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default Router;
