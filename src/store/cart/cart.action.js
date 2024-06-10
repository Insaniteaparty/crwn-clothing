import { createAction } from "../../utils/reducer/reducer.utils";
import CART_ACTION_TYPES from "./cart.types";

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

//** actual actions */
export const setIsCartOpen = (val) =>
  createAction(CART_ACTION_TYPES.SET_IS_OPEN, val);

export const addItemToCart = (cartItems, productToAdd) => {
  const newItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.UPDATE_CART, newItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.UPDATE_CART, newItems);
};

export const deleteItemFromCart = (cartItems, productToDelete) => {
  const newItems = deleteCartItem(cartItems, productToDelete);
  return createAction(CART_ACTION_TYPES.UPDATE_CART, newItems);
};
