import * as actions from "../userPokemonsActions";
import axios from "axios";

const userPokemons =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.userPokemonsCallBegan.type) return next(action);

    const { onStart, onSuccess, onError, name, method } = action.payload;
    next(action);

    if (onStart) dispatch({ type: onStart });

    dispatch(actions.userPokemonsCallSuccess({ data: name }));
    if (onSuccess) {
      if (method === "put") {
        // if pokemon is added return
        for (let i = 0; i < getState().userPokemons.pokemons.length; i++) {
          if (getState().userPokemons.pokemons[i] === name) {
            return dispatch({
              type: onError,
              payload: { error: "Pokemon alerady added" },
            });
          }
        }
        dispatch({ type: onSuccess, payload: { pokemon: name } });
      } else if (method === "delete") {
        dispatch({ type: onSuccess, payload: name });
      } else if (method === "get") {
        let myPokemons = [];
        for (let i = 0; i < localStorage.length - 1; i++) {
          myPokemons.push(localStorage.getItem(i));
        }
        dispatch({ type: onSuccess, payload: { pokemons: myPokemons } });
      }
    }
  };

export default userPokemons;
