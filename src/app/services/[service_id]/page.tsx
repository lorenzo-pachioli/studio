"use client";

import Image from "next/image";
import { MapPin, Phone, ShoppingCart, Star } from "lucide-react";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { handleAddToCart } from "@/lib/utils";
import { ServicesContext } from "@/hooks/services-state";
import { Badge } from "@/components/ui/badge";

export default function ServicePage({
  params,
}: {
  params: { service_id: string };
}) {
  const { useServiceById } = useContext(ServicesContext);
  const service = useServiceById(params.service_id);

  if (!service) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center">service Not Found</h1>
        <p className="text-center text-muted-foreground mt-4">
          The service you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-primary/20 via-background to-secondary/20 rounded-xl shadow-lg p-8 md:p-16 text-center md:text-left">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src={service?.imageUrl}
            alt="Team PawsomeMart with pets"
            width={600}
            height={450}
            className="rounded-xl shadow-2xl"
            data-ai-hint="team pets"
          />
        </div>

        <div>
          <section className="text-lg mb-16">
            <h1 className="text-5xl font-extrabold mb-4">{service?.name}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {service?.description}
            </p>
            <Badge
              variant="secondary"
              className="mb-2 bg-secondary/70 text-secondary-foreground"
            >
              {service.category}
            </Badge>
          </section>

          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            {service.location}
          </div>

          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            {service.contact}
          </div>
        
          {service.rating && (
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(service.rating!)
                      ? "text-primary fill-primary"
                      : "text-muted-foreground/50"
                  }`}
                />
              ))}
              <span className="ml-1 text-xs text-muted-foreground">
                ({service.rating.toFixed(1)})
              </span>
            </div>
          )}

          <Button
            onClick={() => handleAddToCart(service.name)}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
}
