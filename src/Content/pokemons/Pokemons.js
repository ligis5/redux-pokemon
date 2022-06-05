import {
  Container,
  ListGroup,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../store/pokemons/pokemons";
import { typeColors } from "./typeColors";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pokemons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.pokemons);
  const user = useSelector((store) => store.user);
  const [currentPage, setCurrentPage] = useState(store.currentPage);

  const morePokemons = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (currentPage !== store.currentPage || store.list.length === 0) {
      dispatch(getPokemons(currentPage));
    }
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
  let emailToUsername = user.details.email.split("@")[0];

  return (
    <Container style={{ display: "grid" }} fluid>
      <h1 style={{ textAlign: "center", marginBottom: "100px" }}>Pokemons</h1>
      <Button
        onClick={() => navigate(`/${emailToUsername}/pokemons`)}
        style={{
          width: "fit-content",
          justifySelf: "end",
        }}
      >
        <h3>My pokemons {10}</h3>
      </Button>
      {store.loaded ? (
        <ListGroup>
          {store.list // map all pokemons
            ? store.list.map((pokemon) => (
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
      ) : (
        <Spinner animation="grow" />
      )}

      <Button onClick={morePokemons}>More</Button>
    </Container>
  );
};

export default Pokemons;
