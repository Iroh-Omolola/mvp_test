/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_GATEWAYS,
  FETCH_PROJECTS,
  FETCH_USERS,
  POST_REPORT,
} from "../../actions/app";
import { apiRequest, POST, GET } from "../../actions/index";
import * as urls from "../../../_shared/defs/_urls";

const { API } = urls;

/**
 * "If the action type is POST_REPORT.START, then dispatch an API request to the API.REPORT endpoint,
 * and if the request is successful, dispatch a POST_REPORT.SUCCESS action."
 * 
 * The above function is a redux middleware function. It's a function that takes a dispatch function as
 * an argument, and returns a function that takes a next function as an argument, and returns a
 * function that takes an action as an argument
 */
const postReport =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === POST_REPORT.START) {
      dispatch(
        apiRequest({
          method: POST,
          url: API.REPORT,
          key: "postReport",
          noErrorToast: true,
          onSuccess: (data) => {
            dispatch({ type: POST_REPORT.SUCCESS, payload: data });
          },
          ...action.meta,
        })
      );
    }
  };

/**
 * It's a function that takes a dispatch function as an argument, and returns all users result
 */

const fetchUsers =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    const { type, payload, key, ...rest } = action;
    if (type === FETCH_USERS.START) {
      dispatch(
        apiRequest({
          method: GET,
          url: `${API.USER}`,
          key: key || "fetchUsers",
          onSuccess: (data) => {
            dispatch({ type: FETCH_USERS.SUCCESS, payload: data });
          },
          ...rest,
        })
      );
    }
  };

/**
 * It's a function that takes a dispatch function as an argument, and returns all projects results
 */
const fetchProjects =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    const { type, payload, key, ...rest } = action;
    if (type === FETCH_PROJECTS.START) {
      dispatch(
        apiRequest({
          method: GET,
          url: `${API.PROJECT}`,
          key: key || "fetchProjects",
          onSuccess: (data) => {
            dispatch({ type: FETCH_PROJECTS.SUCCESS, payload: data });
          },
          ...rest,
        })
      );
    }
  };

/**
 * `fetchGateways` is a function that takes an object with a dispatch function as an argument, returns
 * all gateways results
 */
const fetchGateways =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    const { type, payload, key, ...rest } = action;
    if (type === FETCH_GATEWAYS.START) {
      dispatch(
        apiRequest({
          method: GET,
          url: `${API.GATEWAY}`,
          key: key || "fetchGateways",
          onSuccess: (data) => {
            dispatch({ type: FETCH_GATEWAYS.SUCCESS, payload: data });
          },
          ...rest,
        })
      );
    }
  };

export default [fetchUsers, fetchProjects, fetchGateways, postReport];
