import React from "react";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const user = useSelector((store) => store.user);

  return <div>{user.details.email}</div>;
};

export default User;
