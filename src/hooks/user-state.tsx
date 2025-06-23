'use client';

import React, { useState, createContext  } from 'react';
import { IUser } from "@/types";
import { getNullUser } from "@/services/operations";

export const UserContext = createContext<{
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  userLocalStorage: (id?: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>(
  {
    user:  getNullUser(),
    setUser: () => {},
    userLocalStorage: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {}
  }
);

export default function UserProvider({ children }: any) {

    const newUser: IUser = getNullUser();
    const [user, setUser] = useState(newUser);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const userLocalStorage = (uid?: string) => {
        if (typeof window !== 'undefined') {
        localStorage.setItem('pawsomeMartAuth', JSON.stringify({ isAuthenticated: true, uid: uid || '1' }));
      }
    };

    return (
        <UserContext.Provider
          value={{
              user,
              setUser,
              userLocalStorage,
              isAuthenticated, 
              setIsAuthenticated
          }}
        >
          {children}
        </UserContext.Provider>
      );
    }