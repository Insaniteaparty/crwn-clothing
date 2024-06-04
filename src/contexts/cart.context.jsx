import { createContext, useReducer } from "react";

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

const CART_ACTION_TYPES = {
  SET_IS_OPEN: "SET_IS_OPEN",
  UPDATE_CART: "UPDATE_CART",
};

const cartReducer = (state, action) => {
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
        ...payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

/** Provider **/
export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, totalItems, totalPrice }, dispatch] =
    useReducer(cartReducer, INIT_STATE);

  const updateCartItems = (newItems) => {
    const newQty = newItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newPrice = newItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    dispatch({
      type: CART_ACTION_TYPES.UPDATE_CART,
      payload: {
        cartItems: newItems,
        totalItems: newQty,
        totalPrice: newPrice,
      },
    });
  };

  const setIsCartOpen = (value) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_OPEN, payload: value });
  };

  const addItemToCart = (productToAdd) => {
    updateCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    updateCartItems(removeCartItem(cartItems, productToRemove));
  };

  const deleteItemFromCart = (productToDelete) => {
    updateCartItems(deleteCartItem(cartItems, productToDelete));
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
