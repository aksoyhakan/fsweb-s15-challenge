import { LOGIN, REGIST, GET_RIDDLES, GET_USERS } from "./actions";

const initialState = {
  navlinks: [
    { link: "Login", path: "/api/auth/login" },
    { link: "Register", path: "/api/auth/register" },
    { link: "Riddles", path: "/api/bilmeceler" },
    { link: "Users", path: "/api/users" },
  ],
  mainPage: {
    url: "https://4.bp.blogspot.com/-8GKcjlstdaI/Wm4wuNzWXhI/AAAAAAAAauw/lhhNyB1Hr0s9AWNo-VbdcV1iXAUpQgwRACLcBGAs/s320/sphinxriddle.JPG",
    description: "There are thounds of riddles which no one can answer",
  },
  token: JSON.parse(localStorage.getItem("token")),
  welcomeNotes: "",
  registNotes: {},
  users: [],
  riddles: [],
  registerForm: { username: "", password: "", rolename: "" },
  loginForm: { username: "", password: "" },
  newRiddle: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        welcomeNotes: action.payload.message,
      };
    case REGIST:
      return { ...state, registNotes: action.payload };
    case GET_RIDDLES:
      console.log(action.payload);
      return { ...state, riddles: action.payload };
    case GET_USERS:
      console.log(action.payload);
      return { ...state, users: action.payload };
    default:
      return state;
  }
}

export default reducer;
