import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/user/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const emailRef = useRef();
  const passwordRef = useRef();
  const [err, setErr] = useState("none");

  const navigate = useNavigate();

  useEffect(() => {
    if (user.error) setErr("");
    return () => setErr("none");
  }, [user.error]);

  useEffect(() => {
    if (user.loggedIn) navigate("/pokemons");
  }, [user.loggedIn]);

  useEffect(() => {
    console.log("hi");
  }, []);

  const login = (e) => {
    let email = emailRef.current.value;
    let pass = passwordRef.current.value;
    e.preventDefault();
    if (email.length > 0 && pass.length > 0) {
      // send user credentials to firebase to login and wait for response
      dispatch(
        loginUser({
          email: email,
          password: pass,
        })
      );
    }
  };

  return (
    <Container style={{ display: "grid", justifyContent: "center" }}>
      <h1>Login</h1>
      <Form onSubmit={login}>
        <Form.Label style={{ display: "grid" }}>
          <h6>Email</h6>
          <p
            style={{
              marginLeft: "20px",
              marginBottom: "0",
              display: err,
              color: "#da1c1c",
            }}
          >
            {user.error}
          </p>
        </Form.Label>
        <Form.Group>
          <Form.Control
            ref={emailRef}
            required
            type="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Label style={{ display: "grid" }}>
          <h6>Password</h6>
        </Form.Label>
        <Form.Group>
          <Form.Control
            ref={passwordRef}
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Row>
          {user.userLoading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginTop: "10px" }}
              />
              Loading...
            </Button>
          ) : (
            <Button
              variant="primary"
              type="submit"
              style={{ width: "25vw", margin: "auto", marginTop: "10px" }}
            >
              Login
            </Button>
          )}
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
