/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_START":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        user: state.user,
        loading: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
