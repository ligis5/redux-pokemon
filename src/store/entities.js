import { combineReducers } from "redux";
import userReducer from "./user/user";
import pokemonsReducer from "./pokemons/pokemons";

export default combineReducers({
  user: userReducer,
  pokemons: pokemonsReducer,
});
