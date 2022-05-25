import React from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const ChangePage = () => {
    if (location.pathname === "/login") return "Register";
    if (location.pathname === "/register") return "Login";
  };
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
