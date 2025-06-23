'use client';

import React, { useState, createContext  } from 'react';
import { Service } from "@/types";
import { getCollections } from "@/services/operations";

export const ServicesContext = createContext<{
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}>(
  {
    services:  [],
    setServices : () => {}
  }
);

export default function ServicesProvider({ children }: any) {

    const [services, setServices] = useState<Service[]>([]);

    // Initialize services from local storage or set to empty array
    React.useEffect(() => {
      const fetchServices = async () => {
        try {
          const servicesList = await getCollections('services');
          setServices(servicesList);
        } catch (error) {
          console.error("Error initializing services:", error);
        }
      };
      fetchServices();
    }, []);

    return (
        <ServicesContext.Provider
          value={{
              services,
              setServices
          }}
        >
          {children}
        </ServicesContext.Provider>
      );
    }