import { CartIconContainer, ItemCount } from "./cart-icon.styles";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.reducer";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const totalItems = useSelector(selectCartCount);
  const isOpenToggle = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer onClick={isOpenToggle}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{totalItems}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
