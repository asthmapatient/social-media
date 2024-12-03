"use client";
import { createContext, useContext } from "react";
import { User, Session } from "lucia";
interface SessionContext {
  user: User;
  session: Session;
}
//we dont want null value as we will be redirected to login if we are not signed in
const SessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  // type for children with props
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext); // here context has null but we dont need null and we dont need to handle null in every component so we use custom hook to handle it once
  if (!context) {
    throw new Error("Wrap layout in Session Provider");
  }
  return context; // now we dont have null
}
