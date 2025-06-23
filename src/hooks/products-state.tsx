'use client';

import React, { useState, createContext  } from 'react';
import { IUser, Product } from "@/types";
import { getCollections, getNullUser } from "@/services/operations";

export const ProductsContext = createContext<{
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}>(
  {
    products:  [],
    setProducts: () => {}
  }
);

export default function ProductsProvider({ children }: any) {

    const newUser: IUser = getNullUser();
    const [products, setProducts] = useState<Product[]>([]);

    // Initialize products from local storage or set to empty array
    React.useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productsList = await getCollections('products');
          setProducts(productsList);
        } catch (error) {
          console.error("Error initializing products:", error);
        }
      };
      fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider
          value={{
              products,
              setProducts
          }}
        >
          {children}
        </ProductsContext.Provider>
      );
    }