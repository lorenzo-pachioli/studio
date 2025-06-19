'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogIn, UserPlus, LayoutDashboard, LogOut, ShoppingBag, MapPin } from 'lucide-react';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '@/hooks/user-state';
import { IUser } from '@/types';
import { getUser } from '@/services/operations';
import logInWithEmail from '@/services/autentication';


// Mock authentication state
function useAuth() {

  const {
          user,
          setUser,
          isAuthenticated, 
          setIsAuthenticated
  } = useContext(AppContext);

  // Mock logout function
  const logout = () => {

    const userNull: IUser = {
      uid: "",
      displayName: "",
      photoURL: "",
      location: [],
      email: "",
      emailVerified: false,
      boughtProducts: [],
      boughtServices: []
    };

    setIsAuthenticated(false);
    setUser(userNull);

    if (typeof window !== 'undefined') {
      localStorage.removeItem('pawsomeMartAuth');
    }
  };

  return { isAuthenticated, logout, user };
}


export default function UserNav() {

  const {  logout } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const {user, isAuthenticated} = useContext(AppContext);

  useEffect(() => {
    setIsClient(true);
    console.log("is authenticated: (user-nav)", isAuthenticated);
  }, [isAuthenticated]);

  if (!isClient) {
    // Render a placeholder or null during SSR to avoid hydration mismatch
    return (
        <div className="flex items-center space-x-2">
            <div className="w-20 h-10 bg-muted rounded-md animate-pulse"></div>
            <div className="w-20 h-10 bg-muted rounded-md animate-pulse"></div>
        </div>
    );
  }


  if (isAuthenticated) {
    const userInitial = user.displayName?.charAt(0).toUpperCase() || 'U';
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src="https://placehold.co/100x100.png" alt={user.displayName || "User"} data-ai-hint="avatar person" />
              <AvatarFallback className="bg-accent text-accent-foreground">{userInitial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email || 'No email provided'}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/account/dashboard">
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/account/profile">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
             <Link href="/account/orders">
              <DropdownMenuItem>
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>Orders</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/account/addresses">
              <DropdownMenuItem>
                <MapPin className="mr-2 h-4 w-4" />
                <span>Addresses</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Button asChild variant="ghost" className="hover:bg-accent/20 hover:text-accent">
        <Link href="/login">
          <LogIn className="mr-2 h-5 w-5"/>
          Login
        </Link>
      </Button>
      <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
        <Link href="/register">
          <UserPlus className="mr-2 h-5 w-5" />
          Sign Up
        </Link>
      </Button>
    </div>
  );
}
