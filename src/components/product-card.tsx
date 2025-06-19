'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = () => {
    // Mock add to cart functionality
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.uid}`} aria-label={`View details for ${product.name}`}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
            data-ai-hint={product.dataAiHint || "pet product"}
          />
        </Link>
        {product.tags && product.tags.length > 0 && (
          <Badge variant="secondary" className="absolute top-2 left-2 bg-primary/80 text-primary-foreground">
            {product.tags[0]}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
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
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button onClick={handleAddToCart} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
