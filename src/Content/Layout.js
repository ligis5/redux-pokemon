import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
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
    // navigate("/login");
  };

  useEffect(() => {
    if (!user.loggedIn && !user.manualLogout) dispatch(checkIfLoggedIn());
    loader.classList.add("loader--hide");
  }, []);

  return (
    <Container fluid>
      <Row style={{ display: "flex", justifyContent: "flex-end" }}>
        {user.loggedIn ? (
          <h5
            style={{ width: "fit-content", cursor: "pointer", color: "blue" }}
            onClick={logout}
          >
            Logout
          </h5>
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
