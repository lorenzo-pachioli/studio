import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0">
        <Link href={`/services/${service.id}`} aria-label={`View details for ${service.name}`}>
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={300}
            height={200}
            className="w-full h-40 object-cover"
            data-ai-hint={service.dataAiHint || "pet service"}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2 bg-secondary/70 text-secondary-foreground">{service.category}</Badge>
        <Link href={`/services/${service.id}`}>
         <CardTitle className="text-lg font-semibold mb-1 hover:text-primary transition-colors">{service.name}</CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">{service.description}</p>
        {service.location && (
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            {service.location}
          </div>
        )}
        {service.contact && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Phone className="h-4 w-4 mr-2 text-primary" />
            {service.contact}
          </div>
        )}
        {service.rating && (
           <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(service.rating!) ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">({service.rating.toFixed(1)})</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild variant="outline" className="w-full hover:bg-primary/10 hover:text-primary border-primary/50 text-primary">
          <Link href={`/services/${service.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
