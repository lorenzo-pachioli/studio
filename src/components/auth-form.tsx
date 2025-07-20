"use client";

import { useState, FormEvent, useContext, useEffect, use } from "react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PawPrintIcon } from "@/components/icons";
import { Loader2 } from "lucide-react";
import logInWithEmail from "@/services/autentication";
import { auth } from "@/services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "@/hooks/user-state";
import { getUserById, setData } from "@/services/operations";
import { createSession } from "@/services/statelessSession";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For registration
  const { login, logout, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/account/dashboard");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (mode === "login") {
      try {
        const userCredential = await logInWithEmail(email, password);
        if (!userCredential) throw new Error("Login failed");

        await createSession(userCredential.uid);
        const userData = await getUserById(userCredential.uid);
        if (!userData) throw new Error("User data not found");

        login(userData);
        toast({ title: "Login Successful!", description: "Welcome back!" });
        router.push("/account/dashboard");
      } catch (error) {
        logout();
        console.error("Login failed", error);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email or password.",
        });
      }
    } else {
      // Register mode
      if (email && password) {
        // signup validation
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const userData = {
            uid: userCredential.user.uid,
            displayName: name || userCredential.user.email, // Use provided name if available
            photoURL: userCredential.user.photoURL || "",
            email: userCredential.user.email || email,
            emailVerified: userCredential.user.emailVerified || false,
            addresses: [],
            boughtProducts: [],
            boughtServices: [],
          };

          // Save the new user data to the database
          await setData("users", userData.uid, userData);
          await createSession(userData.uid);
          login(userData);
          toast({
            title: "Registration Successful!",
            description: "Welcome to PawsomeMart!",
          });
          router.push("/account/dashboard");
        } catch (error) {
          logout();
          console.error("Registration failed", error);
          toast({
            variant: "destructive",
            title: "Registration Failed",
            description: "An error occurred while creating your account.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "Please fill all fields.",
        });
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
            {mode === "login" ? "Welcome Back!" : "Join PawsomeMart"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Log in to access your account."
              : "Create an account to get started."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "register" && (
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

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : mode === "login" ? (
                "Log In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <a
              href={mode === "login" ? "/register" : "/login"}
              className="font-medium text-primary hover:underline"
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
