/* eslint-disable import/no-anonymous-default-export */
import ui from "./ui";
import api from "./api";
import app from "./app";

export default [...api, ...app, ...ui];
