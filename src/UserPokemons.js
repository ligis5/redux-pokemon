import { useDispatch, useSelector } from "react-redux";
import { Container, ListGroup, Button } from "react-bootstrap";
import { removePokemon } from "./store/userPokemons";
import { Link } from "react-router-dom";

const UserPokemons = () => {
  const dispatch = useDispatch();
  const userPokemons = useSelector((store) => store.userPokemons);
  return (
    <Container fluid>
      <Link to="/pokemons">
        <h3 style={{ textAlign: "end" }}>All Pokemons</h3>
      </Link>
      <h1 style={{ textAlign: "center" }}>My Pokemons</h1>
      {/* <h3>{store.userPokemons.error}</h3> */}
      <ListGroup>
        {userPokemons.pokemons.map((pokemon) => (
          <ListGroup.Item
            key={"user" + pokemon}
            style={{ display: "flex", marginTop: "5px" }}
          >
            {pokemon}
            <Button
              style={{ marginLeft: "auto" }}
              variant="outline-primary"
              onClick={() => dispatch(removePokemon(pokemon))}
            >
              remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default UserPokemons;
