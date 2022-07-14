import * as actions from '../userPokemons/userPokemonsActions';

const userPokemons = ({dispatch}) => (next) => (action) => {
    if(action.type != actions.userPokemonsCallBegan.type) return next(action);


    const {onSuccess, onError, onStart, type, pokemon} = action.payload;

    if(onStart) dispatch({type:onStart});
    next(action);

    if(type === 'addPokemon'){
        console.log(pokemon)
    if(onSuccess) dispatch({type:onSuccess, payload: pokemon})

    if(!pokemon) dispatch({type:onError, payload:"no pokemon found"});
    }
}

export default userPokemons;