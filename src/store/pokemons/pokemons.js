import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "pokemons",
  initialState: {
    list: [],
    loading: false,
    loaded: false,
    error: "",
  },
  reducers: {
    pokemonsRequested: (pokemons, action) => {
      pokemons.loading = true;
      pokemons.loaded = false;
    },
    pokemonsRequestFailed: (pokemons, action) => {
      pokemons.loading = false;
      pokemons.loaded = false;
      pokemons.error = "error";
    },
    allPokemons: (pokemons, action) => {
      pokemons.list.push(...action.payload);
      pokemons.loaded = true;
      pokemons.loading = false;
    },
    pokemonsRemoved: (pokemons, action) => {
      pokemons.list.splice(action.payload.page * 20 - 20, 20);
    },
    allPokemonsRemoved: (pokemons, action) => {
      pokemons.list = [];
      pokemons.loaded = false;
      pokemons.loading = false;
      pokemons.error = "";
    },
  },
});

const {
  allPokemons,
  pokemonsRequested,
  pokemonsRemoved,
  pokemonsRequestFailed,
  allPokemonsRemoved,
} = slice.actions;

export default slice.reducer;

export const getPokemons = (page) => (disptach, getState) => {
  // if (!getState().user.loggedIn) return;

  disptach(
    apiCallBegan({
      page: page,
      onStart: pokemonsRequested.type,
      onSuccess: allPokemons.type,
      onError: pokemonsRequestFailed.type,
    })
  );
};

export const clearPokemons = (page) => (disptach) => {
  disptach({ type: allPokemonsRemoved.type, payload: { page } });
};
