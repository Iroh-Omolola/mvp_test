/* eslint-disable import/no-anonymous-default-export */
import _ from "lodash";
import { push } from "connected-react-router";
import {
  API_REQUEST,
  startLoading,
  stopLoading,
  updateUIError,
} from "../actions/index";
import { createAPIRequest } from "../../services/axios";
import { toast } from "react-toastify";
import { formatMessagesFromError } from "../../_shared/util";

export const processApiError = (error) => {
  let response = "";
  if (!error) {
    response = "An error occurred, please try again!";
  } else if (error.message) {
    response = error.message;
  }
  return response || "An error occurred";
};

const apiRequest =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === API_REQUEST.START) {
      const {
        method,
        url,
        key,
        payload,
        params,
        onError,
        successMessage,
        onSuccess,
        nextRoute,
        noSuccessToast,
        noErrorToast,
      } = action.meta;
      const config = { method, url };
      if (payload && (!_.isEmpty(payload) || payload instanceof FormData)) {
        config.data = payload;
      }
      if (params && !_.isEmpty(params)) {
        config.params = params;
      }
      dispatch(updateUIError(key, null));
      dispatch(startLoading(key));
      createAPIRequest(config)
        .then((response) => {
          const { data, message } = response;

          if (onSuccess) {
            if (typeof onSuccess === "function") {
              onSuccess(data);
            } else {
              dispatch({ type: onSuccess, payload: { data } });
            }
          }
          if (nextRoute) {
            dispatch(push(nextRoute));
          }
          dispatch(stopLoading(key));
          const toastMessage = successMessage || message;
          if (!noSuccessToast && toastMessage) {
            toast.dismiss();
            toast.info(toastMessage);
          }
        })
        .catch((e) => {
          const showErrorMessage = (message) => {
            if (!noErrorToast && method.toLowerCase() !== "get") {
              toast.error(message);
            }
          };
          if (onError) {
            if (typeof onError === "function") {
              onError(e);
            } else {
              const message = formatMessagesFromError(e);
              dispatch(updateUIError(key, message));
              showErrorMessage(
                e.message ? e.message : "Check your internet connection."
              );
            }
          } else {
            console.log("error:", e);
            // dispatch(updateUIError(key, error.data.errors?.password? error.data?.errors?.password[0]:error.data?.errors?.email[0] || error.data.message));
            // showErrorMessage(error ? error : 'Check your internet connection.');
          }
          dispatch(stopLoading(key));
        });
    }
    return next(action);
  };

export default [apiRequest];
