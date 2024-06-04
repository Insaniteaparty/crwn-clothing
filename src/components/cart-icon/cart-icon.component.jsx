import { useContext } from "react";

import { CartIconContainer, ItemCount } from "./cart-icon.styles";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, totalItems } = useContext(CartContext);
  const isOpenToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={isOpenToggle}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{totalItems}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
