import * as actions from "../userActions";

const userApi =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    // goes to next task if userCallBegan was not called
    if (action.type !== actions.userCallBegan.type) return next(action);

    const { onStart, onUserCreated, onSuccess, onError, data } = action.payload;
    next(action);
    //requestUser, userLoading: true
    if (onStart) dispatch({ type: onStart });

    if (data) {
      // create user
      if (onUserCreated) {
        dispatch({
          type: onUserCreated,
          payload: { user: data },
        });
        // call for user login
        dispatch(actions.userCallSuccess({ user: data }));
      }
      // login user
      if (onSuccess) {
        const splitUser = localStorage.getItem("user").split("<>");
        const username = splitUser[0];
        const password = splitUser[1];
        if (data.username === username && data.password === password)
          dispatch({ type: onSuccess, payload: { user: data } });
        else dispatch({ type: onError, payload: "error logging in" });
      }
    } else {
      dispatch({ type: onError, payload: "error setting up user" });
    }
  };

export default userApi;
