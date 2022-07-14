import * as actions from "../user/userActions";
import {
  registerWithEmail,
  loginWithEmail,
  loginPersistence,
  logoutUser,
} from "../../firebase/auth";
import { clearPokemons } from "../pokemons/pokemons";

const userApi =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    // goes to next task if userCallBegan was not called
    if (action.type !== actions.userCallBegan.type) return next(action);

    const { onStart, onSuccess, onError, data, method } = action.payload;
    //requestUser, userLoading: true
    if (onStart) dispatch({ type: onStart });
    
    //log out, clear my pokemons, clear all pokemons
    if (method === "logout") {
      dispatch(actions.userCallSuccess());
      console.log("hi");
      if (onSuccess) {
        logoutUser();
        dispatch({ type: onSuccess });
      }
      if (onSuccess) dispatch(clearPokemons());
    }
    
    if (method === "check") {
      const user = await loginPersistence();
      if (user === "No user found") {
        dispatch(actions.userCallFailed());
        dispatch({ type: onError, payload: "No user found" });
        return;
      }
      let userData = { uid: user.uid, email: user.email };
      
      // //call for user login
      dispatch(actions.userCallSuccess());
      
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: { user: userData } });
      } else dispatch({ type: onError, payload: "error logging in" });
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
      let userData = { uid: user.uid, email: user.email };
      //call for user login
      dispatch(actions.userCallSuccess({ user: userData }));
      //login user
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: { user: userData } });
        next(action);
      } else dispatch({ type: onError, payload: "error logging in" });
    }
  };
  
  export default userApi;
  