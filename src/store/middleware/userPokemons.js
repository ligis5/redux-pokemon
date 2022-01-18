import * as actions from "../userPokemonsActions";
import axios from "axios";

const userPokemons =
  ({ dispatch }) =>
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
        for (let i = 0; i < localStorage.length - 1; i++) {
          if (localStorage.getItem(i) === name)
            return dispatch({
              type: onError,
              payload: "Pokemon alerady added",
            });
        }
        let num = localStorage.length - 1;
        localStorage.setItem(num, name);
        dispatch({ type: onSuccess, payload: { pokemon: name } });
      } else if (method === "delete") {
        localStorage.removeItem(name);
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
