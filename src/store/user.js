import { createSlice } from "@reduxjs/toolkit";
import { userCallBegan } from "./userActions";

const slice = createSlice({
  name: "user",
  initialState: {
    details: {
      username: "",
      password: "",
    },
    loggedIn: false,
    userLoading: false,
  },
  reducers: {
    userLoggedIn: (user, action) => {
      user.details.username = action.payload.user.username;
      user.details.password = action.payload.user.password;
      user.loggedIn = true;
      user.userLoading = false;
    },
    userLogInFailed: (user, action) => {
      user.loggedIn = false;
      user.userLoading = false;
    },
    userLoggedOut: (user, action) => {
      user.loggedIn = false;
      user.userLoading = false;
      user.details.username = "";
      user.details.password = "";
    },
    userRequested: (user, action) => {
      user.userLoading = true;
    },
  },
});

export default slice.reducer;

const { userLoggedOut, userLoggedIn, userRequested, userLogInFailed } =
  slice.actions;

export const createUser = (data) => (dispatch) => {
  dispatch(
    userCallBegan({
      onStart: userRequested.type,
      data,
      onSuccess: userLoggedIn.type,
      onError: userLogInFailed.type,
      method: "create",
    })
  );
};

export const loginUser = (data) => (dispatch) => {
  dispatch(
    userCallBegan({
      onStart: userRequested.type,
      onSuccess: userLoggedIn.type,
      onError: userLogInFailed.type,
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
      onError: userLogInFailed.type,
      method: "logout",
    })
  );
};
