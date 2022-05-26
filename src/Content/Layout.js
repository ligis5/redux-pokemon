import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { checkIfLoggedIn } from "../store/user/user";
import { useDispatch } from "react-redux";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ChangePage = () => {
    if (location.pathname === "/login") return "Register";
    if (location.pathname === "/register") return "Login";
  };

  useEffect(() => {
    dispatch(checkIfLoggedIn());
  }, []);

  return (
    <Container fluid>
      <Row style={{ display: "flex", justifyContent: "flex-end" }}>
        <h5
          style={{ width: "fit-content", cursor: "pointer", color: "blue" }}
          onClick={() => navigate(`/${ChangePage().toLowerCase()}`)}
        >
          <ChangePage />
        </h5>
      </Row>
      <Row>{children}</Row>
    </Container>
  );
};

export default Layout;
