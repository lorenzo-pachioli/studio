"use client";

import React, { useState, createContext, useEffect } from "react";
import { IUser, SessionPayload } from "@/types";
import { getNullUser, getUserById } from "@/services/operations";

export const UserContext = createContext<{
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  login: (userData: IUser) => void;
}>({
  user: getNullUser(),
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
  login: () => {},
});

export default function UserProvider({
  children,
  session,
}: {
  children: any;
  session: SessionPayload;
}) {
  const newUser: IUser = getNullUser();
  const [user, setUser] = useState(newUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const reLogin = async () => {
      try {
        if (session.uid) {
          const userData = await getUserById(session.uid);
          login(userData);
        } else {
          logout();
        }
      } catch (error) {
        logout();
        console.error("Error during re-login:", error);
      }
    };
    !isAuthenticated && reLogin();
  }, [session]);

  const logout = () => {
    const userNull: IUser = getNullUser();
    setIsAuthenticated(false);
    setUser(userNull);
  };

  const login = (userData: IUser) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        login
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
