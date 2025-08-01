"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product-card";
import ServiceCard from "@/components/service-card";
import { ArrowRight, PawPrint, CheckCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import { ServicesContext } from "@/hooks/services-state";
import { ProductsContext } from "@/hooks/products-state";
import { useContext, useState } from "react";
import { PromotionsContext } from "@/hooks/promotions-state";

export default function HomePage() {
  const { products } = useContext(ProductsContext);
  const { services } = useContext(ServicesContext);
  const { promotions } = useContext(PromotionsContext);
  const [promotionIndex, setPromotionIndex] = useState(0);

  const featuredProducts = products.slice(0, 3);
  const featuredServices = services.slice(0, 3);

  const hasPromotions = promotions && promotions.length > 0;
  const currentPromotion = hasPromotions ? promotions[promotionIndex] : null;

  const handlePrev = () => {
    setPromotionIndex((prev) =>
      prev === 0 ? promotions.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setPromotionIndex((prev) =>
      prev === promotions.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/20 via-background to-secondary/20 rounded-xl shadow-lg p-8 md:p-16 text-center md:text-left">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800">
              Everything Your <span className="text-primary">Pawsome</span>{" "}
              Friend Needs!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover a wide range of quality products and trusted services for
              your beloved pets. From nutritious food to fun toys and expert
              care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href="/products">
                  Shop Products <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href="/services">
                  Find Services <PawPrint className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Happy pets playing"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
              priority
              data-ai-hint="happy pets"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button
            asChild
            variant="link"
            className="text-primary hover:underline"
          >
            <Link href="/products">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product: Product) => (
            <ProductCard key={product.uid} product={product} />
          ))}
        </div>
      </section>

      {/* Promotion Section */}
      {currentPromotion && (
        <section className={`${promotionIndex%2 === 0 ? `bg-accent` : `bg-secondary`} text-accent-foreground rounded-xl shadow-lg p-8 md:p-12 relative`}>
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-4">
                {currentPromotion.title}
              </h2>
              <p className="text-lg mb-6">{currentPromotion.description}</p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href={currentPromotion.link}>
                  Learn More <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src={currentPromotion.imageUrl}
                alt={currentPromotion.title}
                width={500}
                height={300}
                className="rounded-lg shadow-xl mx-auto"
                data-ai-hint={currentPromotion.dataAiHint || "pet promotion"}
              />
            </div>
          </div>
          {/* Carousel Controls */}
          {promotions.length > 1 && (
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-4">
              <button
                onClick={handlePrev}
                className="bg-accent-foreground text-accent px-3 py-1 rounded-full shadow hover:bg-accent-foreground/90 transition"
                aria-label="Previous promotion"
              >
                &#8592;
              </button>
              <div className="flex gap-1">
                {promotions.map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block w-2 h-2 rounded-full ${
                      promotionIndex === idx
                        ? "bg-primary"
                        : "bg-accent-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="bg-accent-foreground text-accent px-3 py-1 rounded-full shadow hover:bg-accent-foreground/90 transition"
                aria-label="Next promotion"
              >
                &#8594;
              </button>
            </div>
          )}
        </section>
      )}

      {/* Featured Services Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Popular Services</h2>
          <Button
            asChild
            variant="link"
            className="text-primary hover:underline"
          >
            <Link href="/services">
              Explore Services <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.uid} service={service} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-secondary/20 rounded-xl">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why PawsomeMart?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-3" />
                <CardTitle className="text-xl font-semibold">
                  Quality Guaranteed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We source only the best products for your pets.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <PawPrint className="h-12 w-12 text-primary mx-auto mb-3" />
                <CardTitle className="text-xl font-semibold">
                  Trusted by Pet Lovers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join our community of happy pet parents.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-3" />
                <CardTitle className="text-xl font-semibold">
                  Expert Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access to professional and caring pet services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
