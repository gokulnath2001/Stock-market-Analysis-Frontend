import React, { createContext, useReducer } from "react";
import userReducer from "../reducer/userReducer";

export const userContext = createContext();

const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, [], () => {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : undefined;
  });
  return (
    <userContext.Provider value={{ user, dispatch }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
