import {
  Container,
  ListGroup,
  Button,
  OverlayTrigger,
  Tooltip,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../store/pokemons/pokemons";
import { typeColors } from "./typeColors";
import { useState, useEffect } from "react";

const Pokemons = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.pokemons);
  const [currentPage, setCurrentPage] = useState(1);

  const morePokemons = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    dispatch(getPokemons(currentPage));
  }, [currentPage]);

  // takes type of pokemon and gets color of that type from typeColor array
  const getColor = (type) => {
    let color = typeColors.filter(
      (t) => Object.keys(t)[0] === type.toLowerCase()
    );
    if (color.length === 0) color = [{ none: "rgb(255, 255, 255)" }];
    return color;
  };

  const renderTooltip = (stats, id, props) => {
    return (
      <Tooltip
        bsPrefix
        id="button-tooltip"
        {...props}
        style={{ backgroundColor: "white" }}
      >
        <ListGroup>
          {Object.entries(stats).map((stat) => (
            <ListGroup.Item
              key={`${id}${stat[0]}${stat[1]}`}
            >{`${stat[0]}: ${stat[1]}`}</ListGroup.Item>
          ))}
        </ListGroup>
      </Tooltip>
    );
  };

  return (
    <Container style={{ display: "grid" }} fluid>
      <h1 style={{ textAlign: "center", marginBottom: "100px" }}>Pokemons</h1>
      <ListGroup>
        {store.list
          ? store.list.map((pokemon) => (
              <ListGroup.Item
                key={pokemon.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <div style={{ display: "flex" }}>
                    {pokemon.type.map((type) => {
                      // getColor(type);
                      return (
                        <div
                          variant="default"
                          style={{
                            marginRight: "10px",
                            borderRadius: "10%",
                            border: "1px solid black",
                            backgroundColor: Object.values(
                              getColor(type)[0]
                            )[0],
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
                      );
                    })}
                  </div>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip(pokemon.base, pokemon.id)}
                  >
                    <h3>{pokemon.name.english}</h3>
                  </OverlayTrigger>
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
