/* eslint-disable import/no-anonymous-default-export */
import { push } from "connected-react-router";
import { UI_NAVIGATE } from "../actions";

/**
 * If the action type is UI_NAVIGATE, then dispatch a push action to the router.
 */
export const navigateTo =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === UI_NAVIGATE) {
      dispatch(push((window.location = action.payload)));
    }
  };

export default [navigateTo];
