"use client";

import React, { useState, createContext, useEffect } from "react";
import { ICartItem, Product } from "@/types";
import { mockCartItems } from "@/lib/data";
import { log } from "console";

export const ShopingCartContext = createContext<{
  cartList: ICartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  useCartItemById: (uid: string) => ICartItem | undefined;
  useAddToCart: (product: Product, quantity?: number) => void;
  useRemoveCartItem: (uid: string, quantity: number) => void;
}>({
  cartList: [],
  setCartItems: () => {},
  useCartItemById: () => undefined,
  useAddToCart: () => {},
  useRemoveCartItem: () => {},
});

export default function ShopingCartProvider({ children }: any) {
  const [ cartList, setCartItems ] = useState<ICartItem[]>(mockCartItems);
  const [cartItemById, setCartItemById] = useState<ICartItem | undefined>();

  useEffect(() => {
    console.log("cart:", cartList);
  }, [cartList]);

  const useCartItemById = (uid: string): ICartItem|undefined => {
    const cartItem = cartList.find((cart) => {
      if (cart.uid == uid) return cart;
    });
    setCartItemById(cartItem);
    return cartItemById;
  };

  const useRemoveCartItem = (uid: string, quantity: number) => {
    const updatedCartList = cartList.map((item) => {
      if (item.uid === uid) {
        item.quantity -= quantity;
        console.log("Removing item:", item);
      }
      return item;
    }).filter(item => item.quantity > 0); // Filter out items with zero quantity
    setCartItems(updatedCartList);
  }

  const useAddToCart = (product: Product, quantity: number = 1) => {
    const existingCartItem = cartList.find((item) => item.product_id === product.uid);
    if (existingCartItem) { 
      // If the item already exists in the cart, update the quantity
      existingCartItem.quantity += quantity;
      setCartItems([...cartList]);
    }
    else {
      // If the item does not exist, add it to the cart
      const newCartItem: ICartItem = {
        uid: crypto.randomUUID(),
        product_id: product.uid,
        product: product.name,
        quantity,
        price: product.price,
      };
      setCartItems([...cartList, newCartItem]);
    }
  }

  return (
    <ShopingCartContext.Provider
      value={{
        cartList,
        setCartItems,
        useCartItemById,
        useAddToCart,
        useRemoveCartItem
      }}
    >
      {children}
    </ShopingCartContext.Provider>
  );
}
