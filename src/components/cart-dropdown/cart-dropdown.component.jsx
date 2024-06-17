import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

import { useNavigate } from "react-router-dom";

import CustomButton from "../custom-button/custom-botton.component";
import CartItem from "../cart-item/cart-item.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.reducer";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>

      <CustomButton
        style={{ fontSize: 0.75 + "rem" }}
        onClick={() => {
          dispatch(setIsCartOpen(false));
          navigate("/checkout");
        }}
      >
        Go to checkout
      </CustomButton>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
