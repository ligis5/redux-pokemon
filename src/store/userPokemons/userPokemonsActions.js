import { createAction } from "@reduxjs/toolkit";
export const userPokemonsCallBegan = createAction("userPokemons/callBegan");
export const userPokemonsCallSuccess = createAction("userPokemons/callSuccess");
export const userPokemonsCallFailed = createAction("userPokemons/callFailed");
