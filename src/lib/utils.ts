import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


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

export function onRenderCallback(
  id: any, // the "id" prop of the Profiler tree that has just committed
  phase: any, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration: any, // time spent rendering the committed update
  baseDuration: any, // estimated time to render the entire subtree without memoization
  startTime: any, // when React began rendering this update
  commitTime: any // when React committed this update
) {
  // Aggregate or log the performance data
  // Aggregate or log the performance data
}
