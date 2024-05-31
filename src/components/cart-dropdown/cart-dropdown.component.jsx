import "./cart-dropdown.styles.scss";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import CustomButton from "../custom-button/custom-botton.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>

      <CustomButton
        style={{ fontSize: 0.75 + "rem" }}
        onClick={() => {
          setIsCartOpen(false);
          navigate("/checkout");
        }}
      >
        Go to checkout
      </CustomButton>
    </div>
  );
};

export default CartDropdown;
