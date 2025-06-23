import type { Promotion } from '@/types'; 

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
