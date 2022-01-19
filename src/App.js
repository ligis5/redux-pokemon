import Pokemons from "./Pokemons";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPokemons from "./UserPokemons";
import Register from "./Register";
import Login from "./Login";
import Loading from "./Loading";
import Layout from "./Layout";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Loading />
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
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/pokemons"
            element={
              <Layout>
                <Pokemons />
              </Layout>
            }
          />
          <Route
            path="/user-pokemons"
            element={
              <Layout>
                <UserPokemons />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
