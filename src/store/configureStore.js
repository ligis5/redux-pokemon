import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./entities";
import api from "./middleware/api";
import user from "./middleware/user";
import userPokemons from "./middleware/userPokemons";

export default () => {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), api, user, userPokemons],
  });
};
