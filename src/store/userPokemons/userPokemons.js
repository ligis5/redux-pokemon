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
            pokemons.error = action.payload.code;
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

export const addPokemon = (pokemonId) => (dispatch) => {
    dispatch(
      userPokemonsCallBegan({
        type:'addPokemon',
        pokemonId,
        onStart:userPokemonsRequested.type,
        onSuccess: pokemonAdded.type,
        onError:userPokemonsRequestFailed.type,
    }))
}
// to be made
export const getUserPokemons = () => (dispatch) => {
    dispatch(
        userPokemonsCallBegan({

        })
    )
}