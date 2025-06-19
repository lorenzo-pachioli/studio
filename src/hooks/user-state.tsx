'use client';

import React, { useState, createContext  } from 'react';
import { IUser } from "@/types";
import { getUser } from "@/services/operations";

export const AppContext = createContext<{
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  userLocalStorage: (id?: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>(
  {
    user: {
      uid: "",
      displayName: "",
      photoURL: "",
      location: [],
      email: "",
      emailVerified: false
    },
    setUser: () => {},
    userLocalStorage: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {}
  }
);

export default function AppProvider({ children }: any) {

    const newUser: IUser = getUser("1");
    const [user, setUser] = useState(newUser);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const userLocalStorage = (uid?: string) => {
        if (typeof window !== 'undefined') {
        localStorage.setItem('pawsomeMartAuth', JSON.stringify({ isAuthenticated: true, uid: uid || '1' }));
      }
    };

    return (
        <AppContext.Provider
          value={{
              user,
              setUser,
              userLocalStorage,
              isAuthenticated, 
              setIsAuthenticated
          }}
        >
          {children}
        </AppContext.Provider>
      );
    }