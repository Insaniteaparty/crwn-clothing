import { useContext } from "react";

import "./product-card.styles.scss";

import { CartContext } from "../../contexts/cart.context";

import CustomButton, {
  BUTTON_TYPE_CLASS,
} from "../custom-button/custom-botton.component";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton
        buttonType={BUTTON_TYPE_CLASS.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </CustomButton>
    </div>
  );
};

export default ProductCard;
