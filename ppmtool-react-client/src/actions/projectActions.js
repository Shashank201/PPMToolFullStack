import axios from "../axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async (dispatch) => {
  await axios
    .post("api/project", project)
    .then((res) => {
      history.push("/dashboard");
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getProjects = () => async (dispatch) => {
  await axios
    .get("api/project/all")
    .then((res) => {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const getProject = (projectId, history) => async (dispatch) => {
  await axios
    .get(`api/project/${projectId}`)
    .then((res) => {
      dispatch({
        type: GET_PROJECT,
        payload: res.data,
      });
    })
    .catch((error) => {
      history.push("/dashboard");
    });
};

export const deleteProject = (projectId) => async (dispatch) => {
  await axios
    .delete(`api/project/${projectId}`)
    .then((res) => {
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};
