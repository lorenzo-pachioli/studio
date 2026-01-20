"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "@/hooks/user-state";
import type { Product } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useContext } from "react";
import { ShopingCartContext } from "@/hooks/shopingCart-state";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { useAddToCart } = useContext(ShopingCartContext);
  const { isAuthenticated } = useContext(UserContext);
  const router = useRouter();

  const handleAddToCart = (product: Product, quantity: number) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    useAddToCart(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full group">
      <CardHeader className="p-0 relative">
        <Link
          href={`/products/${product.uid}`}
          aria-label={`View details for ${product.name}`}
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover bg-gray-500 transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint || "pet product"}
          />
        </Link>
        {product.tags && product.tags.length > 0 && (
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 bg-primary/80 text-primary-foreground"
          >
            {product.tags[0]}
          </Badge>
        )}
        {/*{product.stock !== undefined && (
          <Badge variant={product.stock > 0 ? 'default' : 'destructive'} className={product.stock > 0 ? 'bg-green-100 text-green-800' : ''}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Badge>
        )} */}
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.uid}`}>
          <div className="flex justify-between items-start mb-2">
            <Badge variant={"outline"}>
              {<Package className="mr-1 h-3 w-3" />}
              {product.category}
            </Badge>
            {product.stock !== undefined && (
              <Badge
                variant={product.stock > 0 ? "default" : "destructive"}
                className={
                  product.stock > 0 ? "bg-green-100 text-green-800" : ""
                }
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg leading-tight mb-1">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm line-clamp-2">
            {product.description}
          </CardDescription>
        </Link>
      </CardContent>
      <CardContent className="p-0 py-2 px-4">
        <p className="text-xl font-bold text-primary text-right">${product.price.toFixed(2)}</p>
      </CardContent>

      {/* <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.uid}`}>
          <CardTitle className="text-lg font-semibold mb-1 hover:text-primary transition-colors">{product.name}</CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">{product.description}</p>
         {product.rating && (
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating!) ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">({product.rating.toFixed(1)})</span>
          </div>
        )} 
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent> */}
      <CardFooter className="p-4 border-t">
        <Button
          onClick={() => handleAddToCart(product, 1)}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
