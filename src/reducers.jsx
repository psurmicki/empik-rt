import { get, filter } from 'lodash';

export function apiReducer(state, action) {
  switch (action.type) {
    case 'FETCHING_DATA':
      return {
        data: null,
        isLoading: true,
        error: null
      };
    case 'FETCHED_SUCCESS':
      return {
        data: action.payload,
        isLoading: false,
        error: null
      };
    case 'FETCHED_FAILED':
      return {
        data: null,
        isLoading: false,
        error: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export function checkDataReducer(state, action) {
  switch (action.type) {
    case 'CHECK_DATA':
      return {
        data: null,
        isLoading: true,
        error: false
      };
    case 'CHECK_SUCCESS':
      return {
        data: action.payload,
        isLoading: false,
        error: false
      };
    case 'CHECK_FAILED':
      return {
        data: action.payload,
        isLoading: false,
        error: true
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export function cartReducers(state, action) {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART':
      return {
        ...state,
        cart: [...state.cart, ...action.payload]
      };
    case 'REMOVE_PRODUCT_FROM_CART':
      const itemsFilteredByPid = filter(state.cart, item => item.pid == action.payload);
      const restOfCartItems = filter(state.cart, item => item.pid !== action.payload);
      itemsFilteredByPid.shift();
      return {
        ...state,
        cart: [...restOfCartItems, ...itemsFilteredByPid]
      };
    case 'UPDATED_CART':
      const minValue = get(action.payload, 'min', null);
      const filteredItems = filter(state.cart, item => item.pid == action.payload.pid);
      const cartItems = filter(state.cart, item => item.pid !== action.payload.pid);
      filteredItems.length = minValue
      return {
        ...state,
        cart: [...cartItems, ...filteredItems]
      };
    case 'HANDLE_MODAL':
      return {
        ...state,
        modalIsOpen: action.payload.modalIsOpen,
        product: action.payload.product
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
