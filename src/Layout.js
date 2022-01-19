import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { logOut } from "./store/user";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [path, setPath] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((store) => store);

  useEffect(() => {
    if (user.loggedIn) {
      return navigate("/pokemons");
    } else {
      if (localStorage.getItem("user")) navigate("/login");
      else navigate("/register");
    }
  }, [user.loggedIn]);

  useEffect(() => {
    if (!user.loggedIn) {
      if (location.pathname === "/login") setPath("register");
      if (location.pathname === "/register") setPath("login");
    }
    return () => {
      setPath("");
    };
  }, [location.pathname]);

  return (
    <div>
      {user.loggedIn && (
        <Button
          onClick={() => dispatch(logOut())}
          variant="outline-primary"
          style={{ position: "absolute", left: "10px", top: "10px" }}
        >
          Log out
        </Button>
      )}

      <Link to={`/${path}`} style={{ position: "absolute", right: "10px" }}>
        <h3 style={{ margin: 0 }}>
          {path.charAt(0).toUpperCase() + path.slice(1)}
        </h3>
      </Link>
      {children}
    </div>
  );
};

export default Layout;
