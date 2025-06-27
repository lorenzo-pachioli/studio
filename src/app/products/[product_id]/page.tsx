"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { useContext } from "react";
import { ProductsContext } from "@/hooks/products-state";
import { Button } from "@/components/ui/button";
import { handleAddToCart } from "@/lib/utils";

export default function ProductPage({
  params,
}: {
  params: { product_id: string };
}) {

  const { useProductById } = useContext(ProductsContext);
  const product = useProductById(params.product_id);

  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center">Product Not Found</h1>
        <p className="text-center text-muted-foreground mt-4">
          The product you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
      <section className="bg-gradient-to-br from-primary/20 via-background to-secondary/20 rounded-xl shadow-lg p-8 md:p-16 text-center md:text-left">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src={product?.imageUrl}
              alt="Team PawsomeMart with pets"
              width={600}
              height={450}
              className="rounded-xl shadow-2xl"
              data-ai-hint="team pets"
            />
          </div>
          <div>
            <section className="text-center mb-16">
              <h1 className="text-5xl font-extrabold mb-4">{product?.name}</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {product?.description}
              </p>
            </section>
            <h2 className="text-3xl font-bold mb-6">{product.brand}</h2>
            <p className="text-lg text-foreground/90 mb-4">
              {product.category}
            </p>
            {product.rating && (
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating!)
                        ? "text-primary fill-primary"
                        : "text-muted-foreground/50"
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs text-muted-foreground">
                  ({product.rating.toFixed(1)})
                </span>
              </div>
            )}

            <p className="text-xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>

            <Button
              onClick={() => handleAddToCart(product.name)}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </section>
  );
}
