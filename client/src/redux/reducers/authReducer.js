import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_USER_LOADED,
  AUTH_USER_ERROR,
  AUTH_USER_LOGOUT
} from "../action/typeof";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  name: null
};
export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case AUTH_USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        name: payload.user.name,
        token: localStorage.getItem("token")
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_USER_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    case AUTH_USER_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};
