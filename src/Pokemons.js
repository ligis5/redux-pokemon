import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, removePokemons } from "./store/pokemons";
import { addPokemon } from "./store/userPokemons";
import { Container, ListGroup, Button } from "react-bootstrap";
let currentPage = 0;
const Pokemons = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  const addPage = () => {
    currentPage++;
    dispatch(getPokemons(currentPage));
  };
  const removePage = () => {
    dispatch(removePokemons(currentPage));
    if (currentPage > 0) currentPage--;
    else return;
  };
  const add = (name) => {
    dispatch(addPokemon(name));
  };
  return (
    <Container fluid>
      <Link to="/user-pokemons">
        <h3 style={{ textAlign: "end" }}>
          My pokemons {store.userPokemons.pokemons.length}
        </h3>
      </Link>
      <h1 style={{ textAlign: "center" }}>All Pokemons</h1>
      <ListGroup>
        <Button variant="outline-primary" onClick={removePage}>
          Show less
        </Button>
        {store.pokemons.list.map((list) =>
          list.map((pokemon) => (
            <ListGroup.Item key={pokemon.name} style={{ display: "flex" }}>
              {pokemon.name}{" "}
              <Button
                style={{ marginLeft: "auto" }}
                variant="outline-primary"
                onClick={() => add(pokemon.name)}
              >
                add
              </Button>
            </ListGroup.Item>
          ))
        )}

        <Button variant="outline-primary" onClick={addPage}>
          Show more
        </Button>
      </ListGroup>
    </Container>
  );
};

export default Pokemons;
