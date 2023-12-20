import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

type UserContextProps = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (!user)
            router.push("/login")
    }, [user])
    const value = {
        user,
        setUser
    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}