"use client";

import useSessionHook, { UseSessionHook } from "@/hooks/useSessionHook";
import { createContext, useContext } from "react";

const SessionContext = createContext<UseSessionHook | null>(null);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const state = useSessionHook();

  return (
    <SessionContext.Provider value={state}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
