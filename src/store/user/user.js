import { createSlice } from "@reduxjs/toolkit";
import { userCallBegan } from "./userActions";

const slice = createSlice({
  name: "user",
  initialState: {
    details: {
      email: "",
      uid: "",
    },
    error: "",
    loggedIn: false,
    userLoading: false,
  },
  reducers: {
    userLoggedIn: (user, action) => {
      user.details.email = action.payload.user.email;
      user.details.uid = action.payload.user.uid;
      user.loggedIn = true;
      user.userLoading = false;
      user.error = "";
    },
    userLoginFailed: (user, action) => {
      user.loggedIn = false;
      user.userLoading = false;
      user.error = action.payload;
    },
    userLoggedOut: (user, action) => {
      user.details.email = "";
      user.details.uid = "";
      user.loggedIn = false;
      user.userLoading = false;
      user.error = "";
    },
    userRequested: (user, action) => {
      user.userLoading = true;
    },
  },
});
export default slice.reducer;

const { userLoggedIn, userLoginFailed, userLoggedOut, userRequested } =
  slice.actions;

// login persistence
export const checkIfLoggedIn = () => (dispatch) => {
  dispatch(
    userCallBegan({
      onStart: userRequested.type,
      onSuccess: userLoggedIn.type,
      onError: userLoginFailed.type,
      method: "check",
    })
  );
};

export const createUser = (data) => (dispatch) => {
  dispatch(
    userCallBegan({
      onStart: userRequested.type,
      data,
      onSuccess: userLoggedIn.type,
      onError: userLoginFailed.type,
      method: "create",
    })
  );
};

export const loginUser = (data) => (dispatch) => {
  dispatch(
    userCallBegan({
      onStart: userRequested.type,
      onSuccess: userLoggedIn.type,
      onError: userLoginFailed.type,
      data,
      method: "login",
    })
  );
};

export const logOut = () => (dispatch) => {
  dispatch(
    userCallBegan({
      onStart: userRequested.type,
      onSuccess: userLoggedOut.type,
      onError: userLoginFailed.type,
      onError: userLoginFailed.type,
      method: "logout",
    })
  );
};
