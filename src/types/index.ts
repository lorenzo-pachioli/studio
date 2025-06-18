export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  rating?: number;
  stock?: number;
  brand?: string;
  tags?: string[];
  dataAiHint?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string; // e.g., Vet, Grooming, Training
  imageUrl: string;
  location?: string;
  contact?: string; // Phone or email
  rating?: number;
  dataAiHint?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string; // Link to product, category, or page
  dataAiHint?: string;
}
