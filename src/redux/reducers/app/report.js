import { FETCH_USERS, FETCH_GATEWAYS, FETCH_PROJECTS,POST_REPORT, RESET_REPORT } from "../../actions/app";

const defaultState = {
  report: undefined,
  users: {},
  project: {},
  gateway: {},
};

const reportReducer = (state = defaultState, action) => {
    
    const { type, payload } = action;
  
    switch (type) {
      case POST_REPORT.SUCCESS:
        return Object.assign({}, state, { report: payload });
      case FETCH_GATEWAYS.SUCCESS:
        return Object.assign({}, state, { gateway: payload });
      case FETCH_PROJECTS.SUCCESS:
        return Object.assign({}, state, { project: payload });
      case FETCH_USERS.SUCCESS:
        return Object.assign({}, state, { users: payload });
      case RESET_REPORT:
        return Object.assign({}, state, { report: undefined });
      default:
        return state;
    }
};


export default reportReducer;