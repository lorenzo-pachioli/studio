'use client';

import { useContext, useState } from 'react';
import ServiceCard from '@/components/service-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, FilterX } from 'lucide-react';
import { ServicesContext } from '@/hooks/services-state';


export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const { services } = useContext(ServicesContext);

  const serviceCategories = ['All', ...new Set(services.map(s => s.category))];
  const locations = ['All', ...new Set(services.map(s => s.location).filter(Boolean))] as string[];
  console.log("services", services);

  const filteredServices = services
    .filter(service =>
      (service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       service.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'All' || service.category === selectedCategory) &&
      (selectedLocation === 'All' || service.location === selectedLocation)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'rating-desc': return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSortBy('name-asc');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Pet Care Services</h1>
      
      <div className="mb-8 p-6 bg-card rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div>
            <Label htmlFor="search-service" className="text-sm font-medium">Search Service</Label>
             <div className="relative">
              <Input
                id="search-service"
                type="text"
                placeholder="e.g. Grooming, Vet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <div>
            <Label htmlFor="category-filter" className="text-sm font-medium">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category-filter">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="location-filter" className="text-sm font-medium">Location</Label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger id="location-filter">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-by" className="text-sm font-medium">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Sort services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="lg:col-start-4">
             <Button onClick={resetFilters} variant="outline" className="w-full">
              <FilterX className="mr-2 h-4 w-4" /> Reset Filters
            </Button>
           </div>
        </div>
      </div>

      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.uid} service={service} />
          ))}
        </div>
      ) : (
         <div className="text-center py-12">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Services Found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
