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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  totalItems: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    setTotalItems(totalItems + 1);
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
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
