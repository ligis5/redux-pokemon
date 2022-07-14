import { createSlice } from "@reduxjs/toolkit";
import { userPokemonsCallBegan } from "./userPokemonsActions";

const slice = createSlice({
    name:"userPokemons",
    initialState:{
        list:[],
        loaded:false,
        loading:false,
        error:"",
        currentPage:1,
    },
    reducers:{
        userPokemonsRequested:(pokemons, action) => {
            pokemons.loading = true;
            pokemons.loaded = false;
            pokemons.error = "";
        },
        userPokemonsRequestFailed:(pokemons, action) => {
            pokemons.loaded = false;
            pokemons.loading = false;
            pokemons.error = "error";
        },
        allPokemons:(pokemons, action) => {
            pokemons.list.push(action.payload);
            pokemons.loaded = true;
            pokemons.loading = false;
            pokemons.error = "";
        },
        pokemonAdded:(pokemons, action) => {
            pokemons.list.push(action.payload);
            pokemons.loaded = true;
            pokemons.loading = false;
            pokemons.error = "";
        }
    }
})

const {userPokemonsRequestFailed, userPokemonsRequested, allPokemons, pokemonAdded} = slice.actions;

export default slice.reducer;

export const addPokemon = (pokemon) => (dispatch) => {
    dispatch(
      userPokemonsCallBegan({
        type:'addPokemon',
        pokemon,
        onStart:userPokemonsRequested.type,
        onSuccess: pokemonAdded.type,
        onError:userPokemonsRequestFailed.type,
    }))
}