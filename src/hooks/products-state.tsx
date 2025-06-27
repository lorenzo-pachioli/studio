"use client";

import React, { useState, createContext } from "react";
import { Product } from "@/types";
import { getCollections, getNullUser } from "@/services/operations";

export const ProductsContext = createContext<{
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  useProductById: (id: string) => Product | undefined;
}>({
  products: [],
  setProducts: () => {},
  useProductById: () => undefined,
});

export default function ProductsProvider({ children }: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productById, setProductById] = useState<Product | undefined>();

  // Initialize products from local storage or set to empty array
  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsList = await getCollections("products");
        setProducts(productsList);
      } catch (error) {
        console.error("Error initializing products:", error);
      }
    };
    fetchProducts();
  }, []);

  const useProductById = (id: string): Product|undefined => {
    const product = products.find((product) => {
      if (product.uid == id) return product;
    });
    setProductById(product);
    return productById;
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
