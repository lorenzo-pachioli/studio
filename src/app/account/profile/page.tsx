'use client';

import { useState, FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Load user data (mock)
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('pawsomeMartAuth');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        setName(authData.userName || 'Demo User');
        setEmail(authData.userName?.toLowerCase().replace(' ','.') + '@example.com' || 'demo.user@example.com');
      } else {
        // Default if not logged in (though this page should be protected)
        setName('Demo User');
        setEmail('demo.user@example.com');
      }
    }
  }, []);


  const handleDetailsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API
    
    if (typeof window !== 'undefined') {
       const storedAuth = localStorage.getItem('pawsomeMartAuth');
       if (storedAuth) {
         let authData = JSON.parse(storedAuth);
         authData.userName = name;
         localStorage.setItem('pawsomeMartAuth', JSON.stringify(authData));
       }
    }

    toast({ title: 'Profile Updated', description: 'Your personal details have been saved.' });
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ variant: 'destructive', title: 'Error', description: 'New passwords do not match.' });
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API
    toast({ title: 'Password Updated', description: 'Your password has been changed successfully.' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your personal information and password.</p>
      </div>
      
      <div className="flex items-center space-x-4 p-4 bg-secondary/20 rounded-lg">
        <UserCircle className="h-16 w-16 text-primary" />
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-muted-foreground">{email}</p>
        </div>
      </div>

      <form onSubmit={handleDetailsSubmit} className="space-y-6">
        <h3 className="text-xl font-medium border-b pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
          </div>
        </div>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save Changes
        </Button>
      </form>

      <Separator className="my-8" />

      <form onSubmit={handlePasswordSubmit} className="space-y-6">
        <h3 className="text-xl font-medium border-b pb-2">Change Password</h3>
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} disabled={isLoading} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading} />
          </div>
        </div>
        <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Update Password
        </Button>
      </form>
    </div>
  );
}
