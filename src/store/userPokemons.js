import { createSlice } from "@reduxjs/toolkit";
import { userPokemonsCallBegan } from "./userPokemonsActions";

const slice = createSlice({
  name: "userPokemons",
  initialState: {
    pokemons: [],
    loading: false,
  },
  reducers: {
    userRequestedPokemon: (userPokemons, action) => {
      userPokemons.loading = true;
    },
    userPokemonRequestFailed: (userPokemons, action) => {
      userPokemons.loading = false;
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
      userPokemons.pokemons.splice(action.payload.name);
      userPokemons.loading = false;
    },
  },
});

const {
  userAddedPokemon,
  userRemovedPokemon,
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
