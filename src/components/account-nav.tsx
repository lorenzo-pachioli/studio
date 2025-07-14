'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, User, ShoppingBag, MapPin, LogOut, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

const navItems = [
  { href: '/account/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/account/profile', label: 'Profile', icon: User },
  { href: '/account/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
];

// Mock logout function
const handleLogout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('pawsomeMartAuth');
    window.location.href = '/'; // Simple redirect for mock
  }
  console.log("User logged out");
};

export default function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors',
            pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-foreground/80 hover:text-foreground'
          )}
        >
          <item.icon className={cn(
            'mr-3 h-5 w-5',
            pathname === item.href ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'
            )} 
          />
          <span>{item.label}</span>
        </Link>
      ))}
      <Button variant="ghost" onClick={handleLogout} className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-destructive/10 hover:text-destructive justify-start mt-4 text-foreground/80">
         <LogOut className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-destructive"/>
         <span>Log Out</span>
      </Button>
    </nav>
  );
}
