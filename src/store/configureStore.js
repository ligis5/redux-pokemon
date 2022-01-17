import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./entities";
import api from "./middleware/api";
import user from "./middleware/user";

export default () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), api, user],
  });
};
