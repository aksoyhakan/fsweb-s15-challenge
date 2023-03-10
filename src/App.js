import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import NavLinkHeader from "./components/NavLinkHeader";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Riddles from "./components/Riddles";
import Users from "./components/Users";

function App() {
  const users = useSelector((store) => store.users);
  const token = useSelector((store) => store.token);
  console.log(users);
  return (
    <div>
      <NavLinkHeader />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/api/auth/login">
          <Login />
        </Route>
        <Route path="/api/auth/register">
          <Register />
        </Route>
        {token ? (
          <Route path="/api/bilmeceler">
            <Riddles></Riddles>
          </Route>
        ) : (
          <Redirect exact to="/"></Redirect>
        )}
        {token ? (
          <Route path="/api/users">
            <Users></Users>
          </Route>
        ) : (
          <Redirect exact to="/"></Redirect>
        )}
      </Switch>
    </div>
  );
}

export default App;
