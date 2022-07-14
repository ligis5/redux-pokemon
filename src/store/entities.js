import { combineReducers } from "redux";
import userReducer from "./user/user";
import pokemonsReducer from "./pokemons/pokemons";
import userPokemonsReducer from './userPokemons/userPokemons';

export default combineReducers({
  user: userReducer,
  pokemons: pokemonsReducer,
  userPokemons:userPokemonsReducer,
});
