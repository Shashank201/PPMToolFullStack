import axios from "../axios";
import {
  DELETE_PROJECT_TASK,
  GET_BACKLOG,
  GET_ERRORS,
  GET_PROJECT_TASK,
} from "./types";

export const addProjectTask = (backlog_id, project_Task, history) => async (
  dispatch
) => {
  await axios
    .post(`api/backlog/${backlog_id}`, project_Task)
    .then((res) => {
      history.push(`/projectBoard/${backlog_id}`);

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

export const getBacklog = (backlog_id) => async (dispatch) => {
  await axios
    .get(`api/backlog/${backlog_id}`)
    .then((res) => {
      dispatch({
        type: GET_BACKLOG,
        payload: res.data,
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

export const getProjectTask = (backlog_id, pt_id, history) => async (
  dispatch
) => {
  await axios
    .get(`api/backlog/${backlog_id}/${pt_id}`)
    .then((res) => {
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data,
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

      history.push(`/dashboard`);
    });
};

export const updateProjectTask = (
  backlog_id,
  pt_id,
  updatedProjectTask,
  history
) => async (dispatch) => {
  axios
    .patch(`api/backlog/${backlog_id}/${pt_id}`, updatedProjectTask)
    .then((res) => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });

      history.push(`/projectBoard/${backlog_id}`);
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const deleteProjectTask = (backlog_id, pt_id, history) => async (
  dispatch
) => {
  if (window.confirm(`Are you sure you want to delete ${pt_id} ?`)) {
    await axios
      .delete(`api/backlog/${backlog_id}/${pt_id}`)
      .then((res) => {
        dispatch({
          type: DELETE_PROJECT_TASK,
          payload: pt_id,
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
  }
};
