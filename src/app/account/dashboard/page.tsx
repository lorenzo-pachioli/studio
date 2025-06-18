'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockOrderHistory, mockAddresses } from '@/lib/data';
import { ArrowRight, ShoppingBag, MapPin, UserCircle } from 'lucide-react';

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('pawsomeMartAuth');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        setUserName(authData.userName || "User");
      }
    }
  }, []);
  
  const recentOrder = mockOrderHistory.length > 0 ? mockOrderHistory[0] : null;
  const defaultAddress = mockAddresses.find(addr => addr.isDefault);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Welcome back, {userName}!</h2>
        <p className="text-muted-foreground">Here's a quick overview of your account.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Recent Order</CardTitle>
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {recentOrder ? (
              <>
                <p className="text-sm text-muted-foreground">Order ID: {recentOrder.id}</p>
                <p className="text-2xl font-bold">${recentOrder.total.toFixed(2)}</p>
                <p className={`text-sm font-medium ${recentOrder.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>Status: {recentOrder.status}</p>
              </>
            ) : (
              <p className="text-muted-foreground">No recent orders.</p>
            )}
          </CardContent>
          <div className="p-4 border-t">
            <Button asChild variant="link" className="text-primary p-0 h-auto">
              <Link href="/account/orders">View All Orders <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Default Address</CardTitle>
            <MapPin className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {defaultAddress ? (
              <>
                <p className="font-semibold">{defaultAddress.type}</p>
                <p className="text-sm text-muted-foreground">{defaultAddress.addressLine1}</p>
                <p className="text-sm text-muted-foreground">{defaultAddress.city}, {defaultAddress.state} {defaultAddress.zip}</p>
              </>
            ) : (
              <p className="text-muted-foreground">No default address set.</p>
            )}
          </CardContent>
           <div className="p-4 border-t">
             <Button asChild variant="link" className="text-primary p-0 h-auto">
               <Link href="/account/addresses">Manage Addresses <ArrowRight className="ml-1 h-4 w-4" /></Link>
             </Button>
          </div>
        </Card>
      </div>
      
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Account Details</CardTitle>
          <CardDescription>Update your personal information and password.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center space-x-3 mb-4">
                <UserCircle className="h-8 w-8 text-primary"/>
                <div>
                    <p className="font-semibold">{userName}</p>
                    <p className="text-sm text-muted-foreground">{userName?.toLowerCase().replace(' ', '.')}@example.com</p>
                </div>
            </div>
             <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
               <Link href="/account/profile">
                 Edit Profile <ArrowRight className="ml-2 h-4 w-4" />
               </Link>
             </Button>
        </CardContent>
      </Card>
    </div>
  );
}
