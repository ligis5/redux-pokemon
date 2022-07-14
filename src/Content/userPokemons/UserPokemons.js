import React from "react";
import { useSelector } from "react-redux";
import { Container, Button, ListGroup, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";
import { GetColors } from "../../GetColor";

const UserPokemons = () => {

  const renderTooltip = (stats, id, props) => {
    return (
      <Tooltip
        bsPrefix
        id="button-tooltip"
        {...props}
        style={{ backgroundColor: "white" }}
      >
        <ListGroup>
          {
            // show pokemons stats like defense, attack. stat[0] is key stat[1] is value
            Object.entries(stats).map((stat) => (
              <ListGroup.Item
                key={`${id}${stat[0]}${stat[1]}`}
              >{`${stat[0]}: ${stat[1]}`}</ListGroup.Item>
            ))
          }
        </ListGroup>
      </Tooltip>
    );
  };

  const userPokemons = useSelector(store => store.userPokemons);
  return <Container style={{ display: "grid" }} fluid>
  <h1 style={{ textAlign: "center", marginBottom: "100px" }}>My Pokemons</h1>
  {userPokemons.loaded ? (
    <ListGroup>
      {userPokemons.list // map all pokemons
        ? userPokemons.list.map((pokemon) => (
            <ListGroup.Item
              key={pokemon.id}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ display: "flex" }}>
                  {pokemon.type.map((type) => {
                    return (
                      <div
                        variant="default"
                        style={{
                          marginRight: "10px",
                          borderRadius: "10%",
                          border: "1px solid black",
                          backgroundColor: Object.values(
                            GetColors(type)[0]
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
              <Button variant="outline-primary">Remove</Button>
            </ListGroup.Item>
          ))
        : null}
    </ListGroup>
  ) : (
    <Spinner animation="grow" />
  )}

  {/* <Button onClick={morePokemons}>More</Button> */}
</Container>;
};

export default UserPokemons;
