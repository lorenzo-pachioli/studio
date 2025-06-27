"use client";

import React, { useState, createContext } from "react";
import { Service } from "@/types";
import { getCollections } from "@/services/operations";

export const ServicesContext = createContext<{
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  useServiceById: (id: string) => Service | undefined;
}>({
  services: [],
  setServices: () => {},
  useServiceById: () => undefined,
});

export default function ServicesProvider({ children }: any) {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceById, setServiceById] = useState<Service | undefined>();

  // Initialize services from local storage or set to empty array
  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesList = await getCollections("services");
        setServices(servicesList);
      } catch (error) {
        console.error("Error initializing services:", error);
      }
    };
    fetchServices();
  }, []);

  const useServiceById = (id: string): Service | undefined => {
    const service = services.find((service) => {
      if (service.uid == id) return service;
    });
    setServiceById(service);
    return serviceById;
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        setServices,
        useServiceById
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}
