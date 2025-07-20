import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleAddToCart = (name: string) => {
  // Mock add to cart functionality
  toast({
    title: "Added to cart!",
    description: `${name} has been added to your cart.`,
  });
};
