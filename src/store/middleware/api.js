import axios from "axios";
import * as actions from "../apiActions";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, onSuccess, onError, onStart } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      const response = await axios.request({
        baseURL: "https://pokeapi.co/api/v2/",
        url,
      });

      dispatch(actions.apiCallSuccess(response.data));

      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message));

      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
