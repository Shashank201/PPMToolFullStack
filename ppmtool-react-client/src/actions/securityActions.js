import axios from "../axios";
import { GET_ERRORS, SET_CURRENT_USER, REMOVE_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../axios";

export const createNewUser = (newUser, history) => async (dispatch) => {
  await axios
    .post("api/users/register", newUser)
    .then((res) => {
      history.push("/login");
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const loginUser = (loginRequest) => async (dispatch) => {
  await axios
    .post("api/users/login", loginRequest)
    .then((res) => {
      // extract token from res.data
      const { token } = res.data;
      // store token in localStorage
      localStorage.setItem("jwtToken", token);
      // set token in header**
      setAuthToken(token);
      // decode token in React
      const decoded = jwt_decode(token);
      // dispatch to securityReducer
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({
    type: REMOVE_CURRENT_USER,
    payload: {},
  });
};
