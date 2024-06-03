import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./shop.styles.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  console.log(categoriesMap);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        return (
          <Fragment key={title}>
            <h2>{title.toUpperCase()} &#10093;</h2>
            <div className="products-container">
              {categoriesMap[title]
                .filter((item) => categoriesMap[title].indexOf(item) < 4)
                .map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Shop;
