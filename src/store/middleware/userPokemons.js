import * as actions from '../userPokemons/userPokemonsActions';
import {addUserPokemon} from '../../firebase/database';

const userPokemons = ({dispatch, getState}) => (next) =>async (action) => {
    if(action.type !== actions.userPokemonsCallBegan.type) return next(action);


    const {onSuccess, onError, onStart, type, pokemonId} = action.payload;

    if(onStart) dispatch({type:onStart});
    next(action);

    if(type === 'addPokemon'){
        // data will have pokemon id or error information
       const data = await addUserPokemon(getState().user.details.uid, pokemonId)
    if(onSuccess && data === pokemonId){
        
        const findPokemon = getState().pokemons.list.filter(pokemon => pokemon.id === data)
        dispatch({type:onSuccess, payload: findPokemon[0]})
    } 
    else{
        dispatch({type:onError, payload:data})
    }
    }
}

export default userPokemons;