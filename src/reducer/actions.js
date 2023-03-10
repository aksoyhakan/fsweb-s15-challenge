import axios from "axios";

export const LOGIN = "LOGIN";
export const REGIST = "REGIST";
export const GET_RIDDLES = "GET_RIDDLES";
export const GET_USERS = "GET_USERS";

export const loginObjectCreator = (data) => {
  return { type: LOGIN, payload: data };
};

export const registObjectCreator = (message) => {
  return { type: REGIST, payload: message };
};

export const riddleGetObjectCreator = (riddles) => {
  return { type: GET_RIDDLES, payload: riddles };
};

export const userGetObjectCreator = (users) => {
  return { type: GET_USERS, payload: users };
};

export const loginHelper = (data) => (dispatch) => {
  const { loginData, path } = data;
  axios
    .post(`http://localhost:8000${path}`, loginData)
    .then((response) => {
      dispatch(loginObjectCreator(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      setTimeout(() => {
        dispatch(
          loginObjectCreator({
            token: JSON.parse(localStorage.getItem("token")),
            message: "",
          })
        );
      }, 4050);
    })
    .catch((err) => {
      console.log(err);
      localStorage.setItem("token", JSON.stringify(""));
      dispatch(loginObjectCreator(err.response.data));
      setTimeout(() => {
        dispatch(
          loginObjectCreator({
            token: JSON.parse(localStorage.getItem("token")),
            message: "",
          })
        );
      }, 4050);
    });
};

export const registHelper = (data) => (dispatch) => {
  const { registData, path } = data;
  console.log(data);
  console.log(path);
  axios
    .post(`http://localhost:8000${path}`, registData)
    .then((response) => {
      dispatch(registObjectCreator(response.data));
      setTimeout(() => {
        dispatch(registObjectCreator(""));
      }, 4050);
    })
    .catch((err) => {
      console.log(err);
      dispatch(registObjectCreator(err.response.data));
      setTimeout(() => {
        dispatch(registObjectCreator(""));
      }, 4050);
    });
};

export const getRiddles = (data) => (dispatch) => {
  const { path, token } = data;
  axios
    .get(`http://localhost:8000${path}`, { headers: { Authorization: token } })
    .then((response) => dispatch(riddleGetObjectCreator(response.data)))
    .catch((err) => console.log(err));
};

export const getUsers = (data) => (dispatch) => {
  const { path, token } = data;
  axios
    .get(`http://localhost:8000${path}`, { headers: { Authorization: token } })
    .then((response) => dispatch(userGetObjectCreator(response.data)))
    .catch((err) => console.log(err));
};
