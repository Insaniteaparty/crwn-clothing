import { createContext, useState } from "react";

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    setTotalItems(totalItems + 1); // non need if useEffect
    setTotalPrice(totalPrice + productToAdd.price);
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
    setTotalItems(totalItems - 1); // non need if useEffect
    setTotalPrice(totalPrice - productToRemove.price);
  };

  const deleteItemFromCart = (productToDelete) => {
    const newItems = deleteCartItem(cartItems, productToDelete);
    setCartItems(newItems);
    setTotalItems(totalItems - productToDelete.quantity);
    setTotalPrice(
      totalPrice - productToDelete.price * productToDelete.quantity
    );
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
