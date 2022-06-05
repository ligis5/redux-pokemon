import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../apiActions";

const slice = createSlice({
  name: "pokemons",
  initialState: {
    list: [],
    loading: false,
    loaded: false,
    error: "",
    currentPage: 1,
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
      pokemons.list.push(...action.payload.pokemons);
      pokemons.currentPage = action.payload.page;
      pokemons.loaded = true;
      pokemons.loading = false;
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
  pokemonsRequestFailed,
  allPokemonsRemoved,
} = slice.actions;

export default slice.reducer;

export const getPokemons = (page) => (disptach, getState) => {
  // if (page < getState().pokemons.currentPage) return;
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
