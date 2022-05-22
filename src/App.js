import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./authentication/Reg";
import Login from "./authentication/Login";
import Pokemons from "./Content/pokemons/Pokemons";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
