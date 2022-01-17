import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";

const slice = createSlice({
  name: "pokemons",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    pokemonsRequested: (pokemons, action) => {
      pokemons.loading = true;
    },
    pokemonsRequestFailed: (pokemons, action) => {
      console.log("failed");
      pokemons.loading = false;
    },
    allPokemons: (pokemons, action) => {
      pokemons.list.push(action.payload.results);
    },
    pokemonAdded: (pokemons, action) => {
      pokemons.list.push(action.payload.pokemon);
    },
  },
});

const { pokemonAdded, allPokemons, pokemonsRequested, pokemonsRequestFailed } =
  slice.actions;

export default slice.reducer;

export const getPokemons = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "pokemon?limit=100&offset=0",
      onStart: pokemonsRequested.type,
      onSuccess: allPokemons.type,
      onError: pokemonsRequestFailed.type,
    })
  );
};
