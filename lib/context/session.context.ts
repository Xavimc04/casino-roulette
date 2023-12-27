import { Session } from "@/types/auth/types";
import { createContext } from "react";

interface Context {
    session: boolean | Session;
    setSession: (session: boolean | Session) => void;
}

export const SessionContext = createContext<Context>({
    session: false, 
    setSession: () => {}
})