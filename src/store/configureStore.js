import { configureStore } from "@reduxjs/toolkit";
import reducer from "./entities";
import user from "./middleware/user";
import api from "./middleware/api";

export default () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      user,
      api,
    ],
  });
};
