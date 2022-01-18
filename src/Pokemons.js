import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, removePokemons } from "./store/pokemons";
import { createUser, loginUser } from "./store/user";
import { addPokemon } from "./store/userPokemons";
let currentPage = 0;
const Pokemons = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  useEffect(() => {
    dispatch(loginUser({ username: "Lukas", password: "Lukas" }));
  }, []);

  const addPage = () => {
    currentPage++;
    dispatch(getPokemons(currentPage));
  };
  const removePage = () => {
    dispatch(removePokemons(currentPage));
    if (currentPage > 0) currentPage--;
    else return;
  };
  console.log(store);
  const add = (name) => {
    dispatch(addPokemon(name));
  };
  return (
    <div>
      <ul style={{ width: "max-content" }}>
        {store.userPokemons.pokemons.map((pokemon) => (
          <li
            key={"user" + pokemon}
            style={{ display: "flex", marginTop: "5px" }}
          >
            {pokemon}
          </li>
        ))}
      </ul>
      <button onClick={removePage}>Show less</button>
      <ul style={{ width: "max-content" }}>
        {store.pokemons.list.map((list) =>
          list.map((pokemon) => (
            <li
              key={pokemon.name}
              style={{ display: "flex", marginTop: "5px" }}
            >
              {pokemon.name}{" "}
              <button
                style={{ marginLeft: "auto" }}
                onClick={() => add(pokemon.name)}
              >
                add
              </button>
            </li>
          ))
        )}
      </ul>
      <button onClick={addPage}>Show more</button>
    </div>
  );
};

export default Pokemons;
