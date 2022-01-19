import * as actions from "../userActions";
import { getPokemons, removeAllPokemons } from "../pokemons";
import { getUserPokemons, removePokemons } from "../userPokemons";

const userApi =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // goes to next task if userCallBegan was not called
    if (action.type !== actions.userCallBegan.type) return next(action);

    const { onStart, onSuccess, onError, data, method } = action.payload;
    next(action);
    //requestUser, userLoading: true
    if (onStart) dispatch({ type: onStart });
    // log out, clear my pokemons, clear all pokemons
    if (method === "logout") {
      dispatch(actions.userCallSuccess());

      if (onSuccess) dispatch({ type: onSuccess });
      if (onSuccess) {
        dispatch(removePokemons());
        dispatch(removeAllPokemons());
        return dispatch({ type: onSuccess });
      }
    }

    // create user
    if (method === "create")
      localStorage.setItem("user", `${data.username}<>${data.password}`);
    if (method === "login" || method === "create") {
      // call for user login
      dispatch(actions.userCallSuccess({ user: data }));
      // login user
      if (onSuccess) {
        const splitUser = localStorage.getItem("user").split("<>");
        const username = splitUser[0];
        const password = splitUser[1];
        if (data.username === username && data.password === password) {
          dispatch({ type: onSuccess, payload: { user: data } });
          // start api call to get pokemons
          dispatch(getPokemons(0));
          dispatch(getUserPokemons());
        } else dispatch({ type: onError, payload: "error logging in" });
      }
    } else {
      dispatch({ type: onError, payload: "error setting up user" });
    }
  };

export default userApi;
