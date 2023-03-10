import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { getRiddles } from "../reducer/actions";
import Riddle from "./Riddle";

function Riddles() {
  const riddles = useSelector((store) => store.riddles);
  const token = useSelector((store) => store.token);
  const dispatch = useDispatch();

  const { url } = useRouteMatch();

  useEffect(() => {
    let newObj = {
      path: url,
      token: token,
    };
    dispatch(getRiddles(newObj));
  }, []);
  console.log(riddles);
  return riddles.length > 0 ? (
    riddles.map((riddle) => <Riddle data={riddle}></Riddle>)
  ) : (
    <p>There is no riddle</p>
  );
}

export default Riddles;
