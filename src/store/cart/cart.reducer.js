import { createSlice } from "@reduxjs/toolkit";

//** helpers */
const addCartItem = (cartItems, productToAdd) => {
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

//** slice */
const CART_INIT_STATE = {
  isCartOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INIT_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    deleteItemFromCart(state, action) {
      state.cartItems = deleteCartItem(state.cartItems, action.payload);
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
