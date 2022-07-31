import {getFirestore, collection, addDoc, setDoc, doc, getDoc, getDocs} from 'firebase/firestore';
import { app } from './initialize';
 
 const db = getFirestore(app);

 export const getUserPokemons = async (userId) => {
    const querySnapshot = await getDocs(collection(db, `user/${userId}/pokemons`));
    querySnapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data())
    }) 
 }

export const addUserPokemon = async (userId, pokemonId) => {
    let data;
    try{
        const docRef = await addDoc(collection(db, "user", userId, "pokemons"), {
            pokemonId
        })
        data = pokemonId;
    }catch(err) {
        console.error("Error adding document", err);
        data = err;
    }
    return data;
 }
 