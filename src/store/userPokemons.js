import { createSlice } from "@reduxjs/toolkit";
import { userPokemonsCallBegan } from "./userPokemonsActions";

const slice = createSlice({
  name: "userPokemons",
  initialState: {
    pokemons: [],
    loading: false,
    error: null,
  },
  reducers: {
    userRequestedPokemon: (userPokemons, action) => {
      userPokemons.loading = true;
    },
    userPokemonRequestFailed: (userPokemons, action) => {
      userPokemons.loading = false;
      userPokemons.error = action.payload.error;
    },
    allUserPokemons: (userPokemons, action) => {
      userPokemons.pokemons.push(...action.payload.pokemons);
      userPokemons.loading = false;
    },
    userAddedPokemon: (userPokemons, action) => {
      userPokemons.pokemons.push(action.payload.pokemon);
      userPokemons.loading = false;
    },
    userRemovedPokemon: (userPokemons, action) => {
      const index = userPokemons.pokemons.indexOf(
        (pokemon) => pokemon === action.payload.name
      );
      userPokemons.pokemons.splice(index, 1);
      userPokemons.loading = false;
    },
    userRemovedPokemons: (userPokemons, action) => {
      userPokemons.pokemons = [];
      userPokemons.loading = false;
    },
  },
});

const {
  userAddedPokemon,
  userRemovedPokemon,
  userRemovedPokemons,
  userRequestedPokemon,
  userPokemonRequestFailed,
  allUserPokemons,
} = slice.actions;

export default slice.reducer;

export const getUserPokemons = () => (dispatch) => {
  dispatch(
    userPokemonsCallBegan({
      onStart: userRequestedPokemon.type,
      onSuccess: allUserPokemons.type,
      onError: userPokemonRequestFailed.type,
      method: "get",
    })
  );
};

export const addPokemon = (name) => (dispatch) => {
  dispatch(
    userPokemonsCallBegan({
      onStart: userRequestedPokemon.type,
      onSuccess: userAddedPokemon.type,
      onError: userPokemonRequestFailed.type,
      name,
      method: "put",
    })
  );
};

export const removePokemon = (name) => (dispatch) => {
  dispatch(
    userPokemonsCallBegan({
      onStart: userRequestedPokemon.type,
      onSuccess: userRemovedPokemon.type,
      onError: userPokemonRequestFailed.type,
      name,
      method: "delete",
    })
  );
};

export const removePokemons = () => (dispatch) => {
  dispatch(
    userPokemonsCallBegan({
      onStart: userRequestedPokemon.type,
      onSuccess: userRemovedPokemons.type,
      onError: userPokemonRequestFailed.type,
      method: "delete",
    })
  );
};
