const token = localStorage.getItem("token");
export const authReducer = (
  state = {
    user: {},
    authMessage: "",
    token: token,
    isLoggedIn: !!token
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.removeItem("token");
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authMessage: "logged",
        isLoggedIn: true
      };
      break;
    case "LOGIN_ERROR":
      return {
        ...state,
        user: {},
        authMessage: action.payload.error.message,
        token: undefined,
        isLoggedIn: false
      };
      break;

    case "LOGGED_IN_SUCCESS":
      return {...state, isLoggedIn: action.payload.success, authMessage: ""};
      break;
    case "LOGGED_IN_ERROR":
      return {...state, isLoggedIn: false, authMessage: ""};
      break;

    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        user: {},
        token: undefined,
        authMessage: "",
        isLoggedIn: false
      };
      break;

    case "REGISTER_SUCCESS":
      return {...state, authMessage: "registered"};
      break;
    case "REGISTER_ERROR":
      return {...state, authMessage: action.payload.error};
      break;
    default:
      return state;
  }
};
