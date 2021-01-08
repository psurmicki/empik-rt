import React, { createContext, useReducer } from "react";
import { cartReducers } from './reducers.jsx';

const initialState = {
  cart: [],
  totalPurchase: [],
  modalIsOpen: false,
  product: {},
  error: null
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducers, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
};

export const Context = createContext(initialState);

export default Store;