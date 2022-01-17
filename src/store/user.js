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
    userCreated: (user, action) => {
      const { username, password } = action.payload.user;
      localStorage.setItem("user", `${username}<>${password}`);
    },
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
      user.details = [];
    },
    userRequested: (user, action) => {
      user.userLoading = true;
    },
  },
});

export default slice.reducer;

const { userCreated, userLoggedIn, userRequested, userLogInFailed } =
  slice.actions;

export const createUser = (data) => (dispatch) => {
  dispatch(
    userCallBegan({
      onStart: userRequested.type,
      data,
      onUserCreated: userCreated.type,
      onSuccess: userLoggedIn.type,
      onError: userLogInFailed.type,
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
    })
  );
};
