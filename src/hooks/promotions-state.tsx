"use client";

import React, { useState, createContext } from "react";
import { Promotion } from "@/types";
import { getCollections } from "@/services/operations";

export const PromotionsContext = createContext<{
  promotions: Promotion[];
  setPromotions: React.Dispatch<React.SetStateAction<Promotion[]>>;
}>({
  promotions: [],
  setPromotions: () => {},
});

export default function PromotionsProvider({ children, initialPromotitons }: any) {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotitons);

  // Initialize promotions from local storage or set to empty array
/*   React.useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const promotionsList = await getCollections("promotions");
        setPromotions(promotionsList);
      } catch (error) {
        console.error("Error initializing promotions:", error);
      }
    };
    fetchPromotions();
  }, []); */

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
