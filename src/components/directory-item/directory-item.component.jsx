import {
  BackgroundImage,
  BodyContainer,
  DirectoryItemContainer,
} from "./directory-item.styles";

import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/shop/${category.title}`);

  return (
    <DirectoryItemContainer onClick={handleClick}>
      <BackgroundImage imageUrl={category.imageUrl} />
      <BodyContainer>
        <h2>{category.title}</h2>
        <p>Shop Now</p>
      </BodyContainer>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
