// context/AuthContext.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { varvfiy } from "../utils/auth"; // Adjust path
import { toast } from "react-toastify";
import { cookies } from "next/dist/server/request/cookies";

interface Iuser {
    token: string;
    user: News.Iuser | null;
}

interface IAuthContext {
    user: Iuser;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

// Initial state
const INITIAL_STATE: Iuser = {
    token: "",
    user: null,
};

export const AuthContext = createContext<IAuthContext | null>({
    user: INITIAL_STATE,
    login: async () => { },
    logout: async () => { },
    loading: true,
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUserState] = useState<Iuser>(INITIAL_STATE);
    const [loading, setLoading] = useState(false);
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
            const data = await req.json(); // ✅ Parse JSON
            const token = data.token;
            console.log("Token from login:", token);
            const user = await varvfiy(token); // Assuming this decodes the token
            localStorage.setItem("auth-token", token);
            setUserState({ token, user });
            window.location.href = "/add-news";
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
        await fetch('/api/auth/login', {
            method: 'DELETE',
        });
    }
    useEffect(() => {
        const loadUser = async () => {
            const token = (await cookies()).get('auth-token');
            if (typeof token === 'string') {
                const user = await varvfiy(token);
                setUserState({ token, user });
            }
            setLoading(false);
        };
        loadUser();
    }, []);
    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
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