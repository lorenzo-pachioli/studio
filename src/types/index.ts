import { JWTPayload } from "jose";

export interface IUser {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  addresses: IAddress[];
  email: string | null;
  emailVerified: boolean;
  boughtProducts?: string[]; // Array of Product document IDs
  boughtServices?: string[]; // Array of Service document IDs
}

export interface IAddress {
  uid: string;
  type: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean
  addressLine2: string;
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

export interface ICartItem {
  uid: string; // Unique identifier for the cart item
  product_id: string; // ID of the product
  product: string; // Name of the product
  quantity: number; // Quantity of the product in the cart
  price: number; // Price of the product
  imageUrl: string; // URL of the product image
};

export interface SessionPayload extends JWTPayload {
  uid: string
  expiresAt: Date;
}
export interface IverifySessionPayload {
  isAuth: boolean;
  cookie?: string;
}