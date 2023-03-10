import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { getUsers } from "../reducer/actions";
import User from "./User";

function Users() {
  const users = useSelector((store) => store.users);
  const token = useSelector((store) => store.token);
  const dispatch = useDispatch();

  const { url } = useRouteMatch();

  useEffect(() => {
    let newObj = {
      path: url,
      token: token,
    };
    dispatch(getUsers(newObj));
  }, []);
  console.log(users);
  return users.length > 0 ? (
    users.map((user) => <User data={user}></User>)
  ) : (
    <p>There is no user</p>
  );
}

export default Users;
