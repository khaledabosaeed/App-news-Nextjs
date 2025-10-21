// context/AuthContext.tsx

"use client";

import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

interface Iuser {
    token: string;
    user: News.Iuser | null;
}

interface IAuthContext {
    user: Iuser;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

// Initial state
const INITIAL_STATE: Iuser = {
    token: "",
    user: null,
};

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUserState] = useState<Iuser>(INITIAL_STATE);
    const login = async (email: string, password: string) => {
        const req = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, email }),
            credentials: "include",
        });
        if (req.status === 200) {
            const data = await req.json();
            const { token, user } = data.data;  
            setUserState({ token, user });
            localStorage.setItem("auth-token", token);
            localStorage.setItem("auth-user", JSON.stringify(user));
            return data;
        } else {
            const error = await req.text(); // Still handle text error messages
            toast.error(error || "Invalid email or password", {
                position: "top-right",
            });
            console.log(error);
        }
    };
    const logout = async () => {
        console.log("clicked");
        await fetch('/api/auth/logout', {
            method: 'POST',
        });
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-user');
        setUserState(INITIAL_STATE);
        window.location.href = "/";
    }
    // useEffect(() => {
    //     const loadUser = async () => {
    //         const token = localStorage.getItem('auth-token');
    //         const user = (localStorage.getItem('auth-user')) as News.Iuser;
    //         if (typeof token === 'string') {
    //             setUserState({ token, user });
    //         }
    //         setLoading(false);
    //     };
    //     loadUser();
    // }, []);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};
export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};