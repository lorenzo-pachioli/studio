export interface IUser {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  location?: ILocation[];
  email: string | null; 
  emailVerified: boolean; 
  boughtProducts?: string[]; // Array of Product document IDs
  boughtServices?: string[]; // Array of Service document IDs
}

interface ILocation{
  uid: string;
  name: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface Product {
  uid: string; // Firebase document ID
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
  uid: string; // Firebase document ID
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
  uid: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string; // Link to product, category, or page
  dataAiHint?: string;
}
