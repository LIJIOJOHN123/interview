import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_USER_LOADED,
  AUTH_USER_ERROR,
  AUTH_USER_LOGOUT
} from "./typeof";
import { alertSet } from "./alert";
import setAuthTokens from "../../utils/setAuthToken";

export const authUserLoaded = () => async dispatch => {
  if (localStorage.token) {
    setAuthTokens(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:8000/api/user");
    dispatch({ type: AUTH_USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_USER_ERROR });
  }
};
export const register = formData => async dispatch => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/register",
      formData
    );
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(authUserLoaded());
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      errors.forEach(error => dispatch(alertSet(error.msg, "error")));
    }
  }
  dispatch({
    type: REGISTER_FAIL
  });
};
export const login = formData => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8000/api/login", formData);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(authUserLoaded());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(alertSet(error.msg, "error")));
    }
  }

  dispatch({ type: LOGIN_FAIL });
};
export const logout = () => {
  return dispatch => {
    // Your code here...
    dispatch({ type: AUTH_USER_LOGOUT });
  };
};
