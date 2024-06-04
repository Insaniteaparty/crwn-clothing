import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import CustomButton from "../custom-button/custom-botton.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
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
          setIsCartOpen(false);
          navigate("/checkout");
        }}
      >
        Go to checkout
      </CustomButton>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
