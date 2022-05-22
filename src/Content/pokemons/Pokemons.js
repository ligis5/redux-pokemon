import React from "react";
import { Container, ListGroup, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, removePokemons } from "../../store/pokemons/pokemons";
import { typeColors } from "./typeColors";

let currentPage = 1;
const Pokemons = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.pokemons);

  const lessPokemons = () => {
    if (currentPage > 1) return currentPage--;
    dispatch(removePokemons(currentPage));
  };

  const morePokemons = () => {
    currentPage++;
    dispatch(getPokemons(currentPage));
  };

  // takes type of pokemon and gets color of that type from typeColor array
  const getColor = (type) => {
    const color = typeColors.filter(
      (t) => Object.keys(t)[0] === type.toLowerCase()
    );
    return color;
  };

  return (
    <Container style={{ display: "grid" }} fluid>
      <h1 style={{ textAlign: "center", marginBottom: "100px" }}>Pokemons</h1>
      <Button onClick={lessPokemons}>Less</Button>
      <ListGroup>
        {store.list
          ? store.list.map((pokemon) => (
              <ListGroup.Item
                key={pokemon.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex" }}>
                    {pokemon.type.map((type) => (
                      <div
                        variant="default"
                        style={{
                          marginRight: "10px",
                          borderRadius: "10%",
                          border: "1px solid black",
                          backgroundColor: Object.values(getColor(type)[0])[0],
                        }}
                        key={type}
                      >
                        <h6
                          style={{
                            width: "min-content",
                            margin: "2px",
                            padding: "0px",
                          }}
                        >
                          {type}
                        </h6>
                      </div>
                    ))}
                  </div>
                  <h3>{pokemon.name.english}</h3>
                </div>
                <Button variant="outline-primary">Add</Button>
              </ListGroup.Item>
            ))
          : null}
      </ListGroup>
      <Button onClick={morePokemons}>More</Button>
    </Container>
  );
};

export default Pokemons;
