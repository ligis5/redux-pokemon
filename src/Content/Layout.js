import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { checkIfLoggedIn, logoutUser } from "../store/user/user";
import { useDispatch, useSelector } from "react-redux";
const loader = document.querySelector(".loader");

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const ChangePage = () => {
    if (location.pathname === "/login") return "Register";
    if (location.pathname === "/register") return "Login";
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (!user.loggedIn && !user.manualLogout) dispatch(checkIfLoggedIn());
    loader.classList.add("loader--hide");
  }, []);

  let emailToUsername = user.details.email.split("@")[0];

  return (
    <Container fluid>
      <Row style={{ display: "flex", justifyContent: "flex-end" }}>
        {user.loggedIn ? (
          <div style={{ display: "flex", width: "fit-content" }}>
            {location.pathname === `/${emailToUsername}` ? (
              <Link to="/pokemons" style={{ textDecoration: "none" }}>
                <h5
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    marginRight: "20px",
                  }}
                >
                  Pokemons
                </h5>
              </Link>
            ) : (
              <Link
                to={`/${emailToUsername}`}
                style={{ textDecoration: "none" }}
              >
                <h5
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    marginRight: "20px",
                  }}
                >
                  {emailToUsername.length > 20
                    ? emailToUsername.substr(0, 20) + "..."
                    : emailToUsername}
                </h5>
              </Link>
            )}
            <h5
              style={{ width: "fit-content", cursor: "pointer", color: "blue" }}
              onClick={logout}
            >
              Logout
            </h5>
          </div>
        ) : (
          <h5
            style={{ width: "fit-content", cursor: "pointer", color: "blue" }}
            onClick={() => navigate(`/${ChangePage().toLowerCase()}`)}
          >
            <ChangePage />
          </h5>
        )}
      </Row>
      <Row>{children}</Row>
    </Container>
  );
};

export default Layout;
