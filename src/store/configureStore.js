import { configureStore } from "@reduxjs/toolkit";
import reducer from "./entities";
import user from "./middleware/user";
import api from "./middleware/api";
import userPokemons from "./middleware/userPokemons";

export default () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      user,
      api,
      userPokemons
    ],
  });
};
