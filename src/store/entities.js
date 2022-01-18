import { combineReducers } from "redux";
import pokemonsReducer from "./pokemons";
import userReducer from "./user";
import userPokemonsReducer from "./userPokemons";

export default combineReducers({
  pokemons: pokemonsReducer,
  user: userReducer,
  userPokemons: userPokemonsReducer,
});
