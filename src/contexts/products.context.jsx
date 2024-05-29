import { createContext, useState } from "react";

import SHOP_LIST from "../shop-data.json";

export const ProductsContext = createContext({
  products: SHOP_LIST,
  setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(SHOP_LIST);
  const value = { products, setProducts };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
