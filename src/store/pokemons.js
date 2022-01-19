import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./apiActions";

const slice = createSlice({
  name: "pokemons",
  initialState: {
    list: [],
    loading: false,
    loaded: false,
    lastFetch: null,
  },
  reducers: {
    pokemonsRequested: (pokemons, action) => {
      pokemons.loading = true;
      pokemons.loaded = false;
    },
    pokemonsRequestFailed: (pokemons, action) => {
      pokemons.loading = false;
      pokemons.loaded = false;
    },
    allPokemons: (pokemons, action) => {
      pokemons.list.push(action.payload.results);
      pokemons.loaded = true;
      pokemons.loading = false;
    },

    pokemonsRemoved: (pokemons, action) => {
      pokemons.list.splice(action.payload.page);
    },
    allPokemonsRemoved: (pokemons, action) => {
      pokemons.list = [];
    },
  },
});

const {
  allPokemons,
  pokemonsRequested,
  pokemonsRequestFailed,
  pokemonsRemoved,
  allPokemonsRemoved,
} = slice.actions;

export default slice.reducer;

// get 100 pokemons offset 0/100/200/300
export const getPokemons = (page) => (dispatch, getState) => {
  if (!getState().user.loggedIn) return;
  const offset = page * 100;
  // if pokemon list already was fetched don't call api
  if (getState().pokemons.list[page]) return;
  // call middleware to fetch pokemons
  dispatch(
    apiCallBegan({
      url: `pokemon?limit=10&offset=${offset}`,
      onStart: pokemonsRequested.type,
      onSuccess: allPokemons.type,
      onError: pokemonsRequestFailed.type,
    })
  );
};

export const removePokemons = (page) => (dispatch) => {
  if (page <= 0) return;
  dispatch({ type: pokemonsRemoved.type, payload: { page } });
};

export const removeAllPokemons = (page) => (dispatch) => {
  if (page <= 0) return;
  dispatch({ type: allPokemonsRemoved.type });
};
