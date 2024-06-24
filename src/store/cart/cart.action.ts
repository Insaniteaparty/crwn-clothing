import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/categories.types";

import { createAction, withMatcher } from "../../utils/reducer/reducer.utils";

//** helpers */
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newItems = [...cartItems];

  for (const item of newItems) {
    if (item.id === productToAdd.id) {
      item.quantity++;
      return [...newItems];
    }
  }
  return [...newItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
) => {
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

const deleteCartItem = (cartItems: CartItem[], productToDelete: CategoryItem) =>
  cartItems.filter((item) => item.id !== productToDelete.id);

//** actual actions */
export const setIsCartOpen = withMatcher((val: boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_OPEN, val)
);

export const setCartItems = withMatcher((newCartItems: CartItem[]) =>
  createAction(CART_ACTION_TYPES.UPDATE_CART, newCartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
) => {
  const newItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newItems);
};

export const deleteItemFromCart = (
  cartItems: CartItem[],
  productToDelete: CategoryItem
) => {
  const newItems = deleteCartItem(cartItems, productToDelete);
  return setCartItems(newItems);
};
