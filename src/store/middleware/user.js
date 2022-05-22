import * as actions from "../user/userActions";
import { registerWithEmail, loginWithEmail } from "../../firebase/auth";

const userApi =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    // goes to next task if userCallBegan was not called
    if (action.type !== actions.userCallBegan.type) return next(action);

    const { onStart, onSuccess, onError, data, method } = action.payload;
    next(action);
    //requestUser, userLoading: true
    if (onStart) dispatch({ type: onStart });
    //log out, clear my pokemons, clear all pokemons
    if (method === "logout") {
      dispatch(actions.userCallSuccess());

      if (onSuccess) dispatch({ type: onSuccess });
      if (onSuccess) console.log("loggedOut");
    }

    //create user
    if (method === "create") {
      let user = await registerWithEmail(data.email, data.password);

      if (user === "Firebase: Error (auth/email-already-in-use).") {
        dispatch(actions.userCallFailed());
        dispatch({ type: onError, payload: "Email is already in use" });
        return;
      }
    }
    if (method === "login" || method === "create") {
      let user = await loginWithEmail(data.email, data.password);
      if (user === "auth/wrong-password") {
        dispatch(actions.userCallFailed());
        dispatch({ type: onError, payload: "Password is incorrect" });
        return;
      }
      if (user === "auth/user-not-found") {
        dispatch(actions.userCallFailed());
        dispatch({ type: onError, payload: "User not found" });
        return;
      }
      //call for user login
      dispatch(actions.userCallSuccess({ user: data }));
      //login user
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: { user: data } });
      } else dispatch({ type: onError, payload: "error logging in" });
    } else {
      dispatch({ type: onError, payload: "Error setting up user" });
    }
  };

export default userApi;
