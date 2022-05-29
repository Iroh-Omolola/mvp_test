import { createActionType, createActionString } from "../../../_shared/util";

export const FETCH_PROJECTS = createActionType("FETCH_PROJECTS", "project");
export const FETCH_GATEWAYS = createActionType("FETCH_GATEWAYS", "gateway");
export const POST_REPORT = createActionType("POST_REPORT", "report");
export const FETCH_USERS = createActionType("FETCH_USERS", "users");
export const RESET_REPORT = createActionString("RESET_REPORT", "report");

/**
 * It returns an object with a type property and a meta property. 
 * 
 * The type property is a string that is the value of the POST/FETCH.START constant. 
 * 
 * The meta property is an object that contains the payload and params properties. 
 * 
 * The payload property is the payload argument that was passed into the function. 
 * 
 * The params property is the params argument that was passed into the function.
 * @param payload - The data that will be sent to the server.
 * @param [params] - {
 */

export const postReport = (payload, params = {}) => ({
  type: POST_REPORT.START,
  meta: { payload, params },
});

export const fetchUsers = (params = {}) => ({
  type: FETCH_USERS.START,
  meta: { params },
});
export const fetchGateways = (params = {}) => ({
  type: FETCH_GATEWAYS.START,
  meta: { params },
});
export const fetchProjects = (params = {}) => ({
  type: FETCH_PROJECTS.START,
  meta: { params },
});
export const resetReport = () => ({
  type: RESET_REPORT.START,
});
