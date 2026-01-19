"use client";

import React, { useState, createContext, useEffect, useContext } from "react";
import { ICartItem, Product } from "@/types";
import { UserContext } from "./user-state";
import { updateUserCart } from "@/services/operations";

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
  const { user } = useContext(UserContext);
  const [ cartList, setCartItems ] = useState<ICartItem[]>([]);
  const [cartItemById, setCartItemById] = useState<ICartItem | undefined>();

  useEffect(() => {
    function initCartValue() {
      if (user && user.openCart) {
        setCartItems(user.openCart);
      }
    }
    initCartValue();
  }, [user]);

  const useCartItemById = (uid: string): ICartItem|undefined => {
    const cartItem = cartList.find((cart) => {
      if (cart.product_id == uid) return cart;
    });
    setCartItemById(cartItem);
    return cartItemById;
  };

  const useRemoveCartItem = async (uid: string, quantity: number) => {
    const updatedCartList = cartList.map((item) => {
      if (item.product_id === uid) {
        item.quantity -= quantity;
      }
      return item;
    }).filter(item => item.quantity > 0); // Filter out items with zero quantity
    setCartItems(updatedCartList);
    await updateUserCart(user, updatedCartList);
  }

  const useAddToCart = async (product: Product, quantity: number = 1) => {
    const existingCartItem = cartList.find((item) => item.product_id === product.uid);
    if (existingCartItem) { 
      // If the item already exists in the cart, update the quantity
      existingCartItem.quantity += quantity;
      setCartItems([...cartList]);
      await updateUserCart(user, [...cartList]);
    }
    else {
      // If the item does not exist, add it to the cart
      const newCartItem: ICartItem = {
        product_id: product.uid,
        product: product.name,
        quantity,
        price: product.price,
      };
      setCartItems([...cartList, newCartItem]);
      await updateUserCart(user, [...cartList, newCartItem]);
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
