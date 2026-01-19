"use client";

import React, { useState, createContext } from "react";
import { Product } from "@/types";

export const ProductsContext = createContext<{
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  useProductById: (id: string) => Product | undefined;
}>({
  products: [],
  setProducts: () => { },
  useProductById: () => undefined,
});

export default function ProductsProvider({ children, initialProducts }: any) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const useProductById = (id: string): Product | undefined => {
    const product = products.find((product) => {
      if (product.uid == id) return product;
    });
    return product;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        useProductById
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
