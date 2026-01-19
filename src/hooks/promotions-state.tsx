"use client";

import React, { useState, createContext } from "react";
import { Promotion } from "@/types";
import { getCollections } from "@/services/operations";

export const PromotionsContext = createContext<{
  promotions: Promotion[];
  setPromotions: React.Dispatch<React.SetStateAction<Promotion[]>>;
}>({
  promotions: [],
  setPromotions: () => { },
});

export default function PromotionsProvider({ children, initialPromotitons }: any) {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotitons);

  return (
    <PromotionsContext.Provider
      value={{
        promotions,
        setPromotions,
      }}
    >
      {children}
    </PromotionsContext.Provider>
  );
}
