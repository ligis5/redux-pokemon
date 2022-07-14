import axios from "axios";
import * as actions from "../apiActions";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { page, onSuccess, onError, onStart } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      const response = await axios.request({
        url: `http://localhost:9001/api/pokemons?page=${page}`,
      });

      let data = { pokemons: response.data, page };
      if (onSuccess) dispatch({ type: onSuccess, payload: data });
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message));
      
      if (onError) dispatch({ type: onError, payload: error.message });
    }
    
  };

export default api;
