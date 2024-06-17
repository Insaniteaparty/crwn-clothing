import "./product-card.styles.scss";

import { addItemToCart } from "../../store/cart/cart.reducer";

import CustomButton, {
  BUTTON_TYPE_CLASS,
} from "../custom-button/custom-botton.component";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;

  const addProductToCart = () => dispatch(addItemToCart(product));

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
