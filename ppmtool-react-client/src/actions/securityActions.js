import axios from "axios";
import { setTokenInHeader } from "../securityUtils/setTokenInHeader";
import { GET_ERRORS, SET_CURRENT_USER, REMOVE_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post(
      //"http://localhost:8080/api/users/register",
      "https://svars8-ppmtool.herokuapp.com/api/users/register",
      newUser
    );
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const loginUser = (loginRequest) => async (dispatch) => {
  try {
    // post => login request
    const res = await axios.post(
      //"http://localhost:8080/api/users/login",
      "https://svars8-ppmtool.herokuapp.com/api/users/login",
      loginRequest
    );
    // extract token from res.data
    const { token } = res.data;
    // store token in localStorage
    localStorage.setItem("jwtToken", token);
    // set token in header**
    setTokenInHeader(token);
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
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setTokenInHeader(false);
  dispatch({
    type: REMOVE_CURRENT_USER,
    payload: {},
  });
};
