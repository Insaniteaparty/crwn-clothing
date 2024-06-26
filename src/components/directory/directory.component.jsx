import { DirectoryContainer } from "./directory.styles";
import DirectoryItem from "../directory-item/directory-item.component.jsx";

const Directory = ({ categories }) => {
  return (
    <DirectoryContainer>
      {categories.map((category) => {
        return <DirectoryItem key={category.id} category={category} />;
      })}
    </DirectoryContainer>
  );
};

export default Directory;
