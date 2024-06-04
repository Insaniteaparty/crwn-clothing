import { createContext, useReducer, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // const existingCartItem = cartItems.find(
  //   (cartItem) => cartItem.id === productToAdd.id
  // );

  // if (existingCartItem) {
  //   return cartItems.map((cartItem) =>
  //     cartItem.id === productToAdd.id
  //       ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //       : cartItem
  //   );
  // }

  const newItems = [...cartItems];

  for (const item of newItems) {
    if (item.id === productToAdd.id) {
      item.quantity++;
      return [...newItems];
    }
  }
  return [...newItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const newItems = [...cartItems];
  for (const item of newItems) {
    if (item.id === productToRemove.id) {
      item.quantity--;
      if (!item.quantity) {
        newItems.splice(newItems.indexOf(item), 1);
      }
    }
  }
  return [...newItems];
};

const deleteCartItem = (cartItems, productToDelete) =>
  cartItems.filter((item) => item.id !== productToDelete.id);

/**  Context **/
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

const INIT_STATE = {
  isCartOpen: false,
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

export const CART_ACTION_TYPES = {
  SET_IS_OPEN: "SET_IS_OPEN",
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  const { cartItems, totalItems, totalPrice } = state;

  switch (type) {
    case CART_ACTION_TYPES.SET_IS_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    case CART_ACTION_TYPES.ADD_ITEM:
      const productToAdd = payload;
      return {
        ...state,
        cartItems: addCartItem(cartItems, productToAdd),
        totalItems: totalItems + 1,
        totalPrice: totalPrice + productToAdd.price,
      };

    case CART_ACTION_TYPES.REMOVE_ITEM:
      const productToRemove = payload;
      return {
        ...state,
        cartItems: removeCartItem(cartItems, productToRemove),
        totalItems: totalItems - 1,
        totalPrice: totalPrice - productToRemove.price,
      };

    case CART_ACTION_TYPES.DELETE_ITEM:
      const productToDelete = payload;
      const newItems = deleteCartItem(productToDelete);
      return {
        ...state,
        cartItems: newItems,
        totalItems: totalItems - productToDelete.quantity,
        totalPrice:
          totalPrice - productToDelete.price * productToDelete.quantity,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

/** Provider **/
export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, totalItems, totalPrice }, dispatch] =
    useReducer(cartReducer, INIT_STATE);

  const setIsCartOpen = (value) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_OPEN, payload: value });
  };

  const addItemToCart = (productToAdd) => {
    dispatch({ type: CART_ACTION_TYPES.ADD_ITEM, payload: productToAdd });
  };

  const removeItemFromCart = (productToRemove) => {
    dispatch({ type: CART_ACTION_TYPES.REMOVE_ITEM, payload: productToRemove });
  };

  const deleteItemFromCart = (productToDelete) => {
    dispatch({ type: CART_ACTION_TYPES.DELETE_ITEM, payload: productToDelete });
  };

  // useEffect(() => {
  //   const count = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setTotalItems(count);
  // }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
