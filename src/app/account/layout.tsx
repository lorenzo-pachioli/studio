'use client'
import AccountNav from '@/components/account-nav';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserContext } from '@/hooks/user-state';
import { useContext, useEffect } from 'react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {isAuthenticated} = useContext(UserContext);

  useEffect(() => {
    if(!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);
  
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">My Account</h1>
        <p className="text-muted-foreground">Manage your account settings, orders, and addresses.</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/4">
          <Card className="shadow-md">
            <CardContent className="p-4">
              <AccountNav />
            </CardContent>
          </Card>
        </aside>
        <div className="flex-1 lg:max-w-3xl">
          <Card className="shadow-md">
            <CardContent className="p-6 md:p-8">
              {children}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
