import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "./store/pokemons";
import { createUser, loginUser } from "./store/user";

const Pokemons = () => {
  const disptach = useDispatch();
  // const pokemons = useSelector(allPokemons);

  useEffect(() => {
    disptach(loginUser({ username: "Lukas", password: "Lukas" }));
  }, []);

  return <div>Hi</div>;
};

export default Pokemons;
