"use client"
import { UserContextProvider } from "@/context/user-context";

export function Providers({ children }: {children: React.ReactNode}) {
    return (
        <UserContextProvider>
            {children}
        </UserContextProvider>
    )
}