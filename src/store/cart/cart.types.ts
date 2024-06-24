import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPES {
  SET_IS_OPEN = "SET_IS_OPEN",
  UPDATE_CART = "UPDATE_CART",
}

export type CartItem = {
  quantity: number;
} & CategoryItem;
