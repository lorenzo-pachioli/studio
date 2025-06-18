'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PawPrintIcon } from '@/components/icons';
import { Loader2 } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration

  // Mock function to simulate login/registration from UserNav
  const mockUserNavLogin = (userName?: string) => {
     if (typeof window !== 'undefined') {
      localStorage.setItem('pawsomeMartAuth', JSON.stringify({ isAuthenticated: true, userName: userName || "Pawsome User" }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (mode === 'login') {
      if (email === 'user@example.com' && password === 'password123') {
        toast({ title: 'Login Successful!', description: 'Welcome back!' });
        mockUserNavLogin('Demo User'); // Use the name if available, or a default
        router.push('/account/dashboard');
      } else {
        toast({ variant: 'destructive', title: 'Login Failed', description: 'Invalid email or password.' });
      }
    } else { // Register mode
      if (name && email && password) {
        toast({ title: 'Registration Successful!', description: 'Welcome to PawsomeMart!' });
        mockUserNavLogin(name);
        router.push('/account/dashboard');
      } else {
         toast({ variant: 'destructive', title: 'Registration Failed', description: 'Please fill all fields.' });
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20rem)] py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <PawPrintIcon className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-3xl font-bold">
            {mode === 'login' ? 'Welcome Back!' : 'Join PawsomeMart'}
          </CardTitle>
          <CardDescription>
            {mode === 'login' ? 'Log in to access your account.' : 'Create an account to get started.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Your Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                mode === 'login' ? 'Log In' : 'Create Account'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <a href={mode === 'login' ? '/register' : '/login'} className="font-medium text-primary hover:underline">
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
