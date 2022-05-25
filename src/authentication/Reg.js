import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../store/user/user";

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const emailRef = useRef();
  const regPassRef = useRef();
  const confirmRegPassRef = useRef();
  const [pswDontMatch, setPswDontMatch] = useState("none");
  const [pswShort, setPswShort] = useState("none");
  const [emailInUse, setEmailInUse] = useState("none");

  const navigate = useNavigate();

  useEffect(() => {
    if (user.loggedIn) navigate("/pokemons");
  }, [user.loggedIn]);

  const register = async (e) => {
    let email = emailRef.current.value;
    let pass = regPassRef.current.value;
    let currentPass = confirmRegPassRef.current.value;
    e.preventDefault();

    if (pass.length > 6 && pass === currentPass) {
      // set display to none to hide passwords don't match text
      setPswDontMatch("none");
      setPswShort("none");
      // send user credentials to firebase to register and await for response
      dispatch(
        createUser({
          email: email,
          password: pass,
        })
      );
      // if user exists show text email already in use
      if (user.error === "Email is already in use") setEmailInUse("");
      else setEmailInUse("none");
    } else {
      // set display to empty to show passwords don't match text
      if (pass !== currentPass) setPswDontMatch("");
      if (pass.length < 6) setPswShort("");
      console.log("error");
      return;
    }
  };

  return (
    <Container style={{ display: "grid", justifyContent: "center" }}>
      <h1>Register</h1>
      <Form onSubmit={register}>
        <Form.Label style={{ display: "grid" }}>
          <h6>Email</h6>
          <p
            style={{
              marginLeft: "20px",
              marginBottom: "0",
              display: emailInUse,
              color: "#da1c1c",
            }}
          >
            user.error}
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
          <p
            style={{
              marginLeft: "20px",
              marginBottom: "0",
              display: pswDontMatch,
              color: "#da1c1c",
            }}
          >
            Passwords don't match
          </p>
          <p
            style={{
              marginLeft: "20px",
              marginBottom: "0",
              display: pswShort,
              color: "#da1c1c",
            }}
          >
            Passwords must be atleast 6 characters long
          </p>
        </Form.Label>
        <Form.Group>
          <Form.Control
            ref={regPassRef}
            required
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Label style={{ display: "grid" }}>
          <h6>Confirm Password</h6>
          <p
            style={{
              marginLeft: "20px",
              marginBottom: "0",
              display: pswDontMatch,
              color: "#da1c1c",
            }}
          >
            Passwords don't match
          </p>
          <p
            style={{
              marginLeft: "20px",
              marginBottom: "0",
              display: pswShort,
              color: "#da1c1c",
            }}
          >
            Passwords must be atleast 6 characters long
          </p>
        </Form.Label>
        <Form.Group>
          <Form.Control
            ref={confirmRegPassRef}
            required
            type="password"
            placeholder="Confirm Password"
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
