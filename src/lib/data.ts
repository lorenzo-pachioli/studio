import type { Product, Service, Promotion } from '@/types';

export const mockProducts: Product[] = [
  {
    uid: '1',
    name: 'Premium Dog Kibble',
    description: 'Nutritious and delicious kibble for adult dogs.',
    price: 29.99,
    category: 'Food',
    imageUrl: 'https://placehold.co/300x300.png',
    rating: 4.5,
    brand: 'Pawsome Eats',
    dataAiHint: 'dog food',
  },
  {
    uid: '2',
    name: 'Interactive Cat Toy',
    description: 'Keeps your cat entertained for hours.',
    price: 12.50,
    category: 'Toys',
    imageUrl: 'https://placehold.co/300x300.png',
    rating: 4.2,
    dataAiHint: 'cat toy',
  },
  {
    uid: '3',
    name: 'Cozy Pet Bed',
    description: 'Soft and comfortable bed for small to medium pets.',
    price: 45.00,
    category: 'Accessories',
    imageUrl: 'https://placehold.co/300x300.png',
    rating: 4.8,
    dataAiHint: 'pet bed',
  },
  {
    uid: '4',
    name: 'Organic Bird Seed Mix',
    description: 'A healthy mix of seeds for your feathered friends.',
    price: 18.75,
    category: 'Food',
    imageUrl: 'https://placehold.co/300x300.png',
    rating: 4.6,
    dataAiHint: 'bird seed',
  },
   {
    uid: '5',
    name: 'Durable Chew Toy for Dogs',
    description: 'Built to last, even for the toughest chewers.',
    price: 15.99,
    category: 'Toys',
    imageUrl: 'https://placehold.co/300x300.png',
    rating: 4.7,
    brand: 'ChewMasters',
    dataAiHint: 'dog toy',
  },
  {
    uid: '6',
    name: 'Luxury Cat Tree',
    description: 'Multi-level cat tree with scratching posts and hideaways.',
    price: 89.99,
    category: 'Accessories',
    imageUrl: 'https://placehold.co/300x300.png',
    rating: 4.9,
    dataAiHint: 'cat tree',
  },
];

export const mockServices: Service[] = [
  {
    uid: 's1',
    name: 'Veterinary Check-up',
    description: 'Comprehensive health check for your pet.',
    category: 'Veterinary',
    imageUrl: 'https://placehold.co/300x200.png',
    location: 'Downtown Pet Clinic',
    contact: '555-1234',
    rating: 4.9,
    dataAiHint: 'vet clinic',
  },
  {
    uid: 's2',
    name: 'Professional Grooming',
    description: 'Includes bath, haircut, and nail trim.',
    category: 'Grooming',
    imageUrl: 'https://placehold.co/300x200.png',
    location: 'Paws & Claws Spa',
    contact: 'info@pawsandclaws.com',
    rating: 4.7,
    dataAiHint: 'pet grooming',
  },
  {
    uid: 's3',
    name: 'Dog Obedience Training',
    description: 'Basic and advanced obedience classes.',
    category: 'Training',
    imageUrl: 'https://placehold.co/300x200.png',
    location: 'Good Dog Academy',
    rating: 4.6,
    dataAiHint: 'dog training',
  },
  {
    uid: 's4',
    name: 'Pet Daycare & Boarding',
    description: 'Safe and fun environment for your pets while you are away.',
    category: 'Boarding',
    imageUrl: 'https://placehold.co/300x200.png',
    location: 'Happy Tails Resort',
    contact: '555-5678',
    rating: 4.8,
    dataAiHint: 'pet boarding',
  },
];

export const mockPromotions: Promotion[] = [
  {
    uid: 'p1',
    title: '20% Off All Dog Food!',
    description: 'Stock up on your furry friend\'s favorite meals. Limited time offer.',
    imageUrl: 'https://placehold.co/600x400.png',
    link: '/products?category=Food&species=Dog',
    dataAiHint: 'dog food sale',
  },
  {
    uid: 'p2',
    title: 'New Arrival: Cat Toys',
    description: 'Explore our latest collection of interactive and fun cat toys.',
    imageUrl: 'https://placehold.co/600x400.png',
    link: '/products?category=Toys&species=Cat',
    dataAiHint: 'cat toys new',
  },
   {
    uid: 'p3',
    title: 'Free Vet Consultation Coupon',
    description: 'Sign up today and get a coupon for a free initial vet consultation with our partners.',
    imageUrl: 'https://placehold.co/600x400.png',
    link: '/services?category=Veterinary',
    dataAiHint: 'vet consultation offer',
  }
];

export const mockOrderHistory = [
  {
    uid: 'ORD001',
    date: '2023-10-26',
    total: 75.98,
    status: 'Delivered',
    items: [
      { name: 'Premium Dog Kibble', quantity: 2, price: 29.99 },
      { name: 'Interactive Cat Toy', quantity: 1, price: 12.50 },
    ],
  },
  {
    uid: 'ORD002',
    date: '2023-11-15',
    total: 45.00,
    status: 'Shipped',
    items: [{ name: 'Cozy Pet Bed', quantity: 1, price: 45.00 }],
  },
];

export const mockAddresses = [
  {
    uid: 'ADDR001',
    type: 'Home',
    addressLine1: '123 Paw Print Lane',
    city: 'Petville',
    state: 'CA',
    zip: '90210',
    isDefault: true,
    addressLine2: ''
  },
  {
    uid: 'ADDR002',
    type: 'Work',
    addressLine1: '456 Meow Street',
    city: 'Cat City',
    state: 'NY',
    zip: '10001',
    isDefault: false,
    addressLine2: ''
  },
];
