import { createActionString, createActionType } from "../../_shared/util";

export const UI_INITIALIZE = createActionString("UI_INITIALIZE", "UI");
export const UI_RESET = createActionString("UI_RESET", "UI");
export const UI_LOADING = createActionType("UI_LOADING", "UI");
export const UI_ERROR = createActionString("UI_ERROR", "UI");
export const UI_NAVIGATE = createActionString("UI_NAVIGATE", "UI");
export const UI_SET_PAGINATION = createActionType("UI_SET_PAGINATION", "UI");
export const UPDATE_SESSION_TOKEN = createActionString(
  "UPDATE_SESSION_TOKEN",
  "auth"
);

export const initialize = (payload) => ({
  type: UI_INITIALIZE,
  payload,
});

export const resetUI = (payload) => ({
  type: UI_RESET,
});

export const startLoading = (key) => ({
  type: UI_LOADING.START,
  key,
});

export const stopLoading = (key) => ({
  type: UI_LOADING.END,
  key,
});

export const updateUIError = (key, value) => ({
  type: UI_ERROR,
  key,
  value,
});

export const navigateTo = (path) => ({
  type: UI_NAVIGATE,
  payload: path,
});

export const updateSessionToken = (token) => ({
  type: UPDATE_SESSION_TOKEN,
  payload: token,
});

export const uiSetPagination = (key, payload) => ({
  type: UI_SET_PAGINATION.START,
  meta: {
    key,
    payload,
  },
});
