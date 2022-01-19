import { Form, Button, Container, Row } from "react-bootstrap";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "./store/user";
const Register = () => {
  const dispatch = useDispatch();
  const logUsername = useRef();
  const regPassword = useRef();
  const regConfirmPassword = useRef();
  const [pswDontMatch, setPswDontMatch] = useState("none");

  const confirmRegistration = (e) => {
    e.preventDefault();
    if (regConfirmPassword.current.value.length > 1) {
      if (regConfirmPassword.current.value !== regPassword.current.value) {
        setPswDontMatch("");
      } else {
        dispatch(
          createUser({
            username: logUsername.current.value,
            password: regPassword.current.value,
          })
        );
        setPswDontMatch("none");
      }
      logUsername.current.value = "";
      regPassword.current.value = "";
      regConfirmPassword.current.value = "";
    }
  };

  return (
    <Container
      style={{ display: "grid", justifyContent: "center", height: "80vh" }}
    >
      <h1 style={{ color: "black", textAlign: "center" }}>Register</h1>
      <Form style={{ width: "fit-content" }} onSubmit={confirmRegistration}>
        <Form.Group controlId="username" style={{ marginBottom: "10px" }}>
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
            ref={regPassword}
          />
        </Form.Group>
        <Form.Group controlId="confirmPsw">
          <Form.Label style={{ display: "flex" }}>
            Confirm Password
            <p
              style={{
                marginLeft: "20px",
                marginBottom: "0",
                display: pswDontMatch,
                color: "#da1c1c",
              }}
            >
              Passwords dont match
            </p>
          </Form.Label>
          <Form.Control
            style={{ width: "50vw" }}
            required
            type="password"
            placeholder="Confirm Password"
            ref={regConfirmPassword}
          />
        </Form.Group>
        <Row>
          <Button
            variant="primary"
            type="submit"
            style={{ width: "25vw", margin: "auto", marginTop: "10px" }}
          >
            Register
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default Register;
