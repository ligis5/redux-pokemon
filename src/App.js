import Pokemons from "./Pokemons";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Pokemons />
    </Provider>
  );
}

export default App;
