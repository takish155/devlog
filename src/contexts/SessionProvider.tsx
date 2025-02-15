"use client";

import { Session } from "next-auth";
import { createContext, useContext } from "react";

const SessionContext = createContext<Session | null>(null);

export const SessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
