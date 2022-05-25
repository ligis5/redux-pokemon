import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./authentication/Reg";
import Login from "./authentication/Login";
import Pokemons from "./Content/pokemons/Pokemons";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { ProtectedRoutes } from "./authentication/protectedRoutes";
import Layout from "./Content/Layout";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/pokemons"
            element={
              <ProtectedRoutes>
                <Layout>
                  <Pokemons />
                </Layout>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/"
            element={
              <>
                <h1>hi</h1> <Link to="/pokemons">link</Link>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
