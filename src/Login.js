import { Form, Button, Container, Row } from "react-bootstrap";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./store/user";

const Login = () => {
  const dispatch = useDispatch();
  const logUsername = useRef();
  const logPassword = useRef();
  const [wrongData, setWrongData] = useState("none");

  const login = (e) => {
    e.preventDefault();
    if (logUsername.current.value.length > 1) {
      const splitUser = localStorage.getItem("user").split("<>");
      const username = splitUser[0];
      const password = splitUser[1];
      if (
        logPassword.current.value !== password ||
        logUsername.current.value !== username
      ) {
        setWrongData("");
      } else {
        dispatch(
          loginUser({
            username: logUsername.current.value,
            password: logPassword.current.value,
          })
        );
        setWrongData("none");
      }
      logUsername.current.value = "";
      logPassword.current.value = "";
    }
  };

  return (
    <Container
      style={{ display: "grid", justifyContent: "center", height: "80vh" }}
    >
      <h1 style={{ color: "black", textAlign: "center" }}>Log In</h1>
      <Form style={{ width: "fit-content" }} onSubmit={login}>
        <Form.Label>
          <p style={{ textAlign: "center" }}>Username</p>
        </Form.Label>
        <Form.Group controlId="Username">
          <Form.Label style={{ display: "flex" }}>
            <p
              style={{
                marginLeft: "20px",
                marginBottom: "0",
                display: wrongData,
                color: "#da1c1c",
              }}
            >
              Wrong username or password
            </p>
          </Form.Label>
          <Form.Control
            style={{ width: "50vw" }}
            required
            type="text"
            placeholder="Username"
            ref={logUsername}
          />
        </Form.Group>
        <Form.Group controlId="psw">
          <Form.Control
            style={{ width: "50vw" }}
            required
            type="password"
            placeholder="Password"
            ref={logPassword}
          />
        </Form.Group>
        <Row>
          <Button
            variant="primary"
            type="submit"
            style={{ width: "25vw", margin: "auto", marginTop: "10px" }}
          >
            Login
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
