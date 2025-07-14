'use client';
import Link from 'next/link';
import MainNav from '@/components/layout/main-nav';
import UserNav from '@/components/auth/user-nav';
import { PawPrintIcon } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icon, Search, ShoppingCart } from 'lucide-react';
import { UserContext } from '@/hooks/user-state';
import { useContext } from 'react';

export default function Header() {
  const {isAuthenticated} = useContext(UserContext);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <PawPrintIcon className="h-10 w-10 text-primary" />
            <span className="font-bold text-2xl text-primary">PawsomeMart</span>
          </Link>
        </div>
        
        <div className="flex-1 justify-center px-4 lg:px-8 hidden md:flex">
           <div className="relative w-full max-w-md">
            <Input
              type="search"
              placeholder="Search products & services..."
              className="h-10 pl-10 pr-4 rounded-full border-primary/50 focus:border-primary focus:ring-primary/50"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <MainNav />
          </div>
          <UserNav />
          {isAuthenticated ? (
            <Link href="/cart" >
              <ShoppingCart />
            </Link>
          ):(<></>)}
          <div className="md:hidden">
             <MainNav /> {/* This will render the Sheet trigger for mobile */}
          </div>
        </div>
      </div>
    </header>
  );
}
