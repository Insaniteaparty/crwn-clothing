import CART_ACTION_TYPES from "./cart.types";

const CART_INIT_STATE = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = CART_INIT_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    case CART_ACTION_TYPES.UPDATE_CART:
      return {
        ...state,
        cartItems: payload,
      };

    default:
      return state;
  }
};
