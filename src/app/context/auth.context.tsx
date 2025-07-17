    // // context/AuthContext.tsx

    // "use client";

    // import { createContext, useContext, useEffect, useState } from "react";
    // import { cookies } from "next/headers";
    // import { varvfiy } from "../utils/auth"; // Adjust path

    // interface Iuser {
    //     token: string;
    //     user: News.Iuser | null;
    // }

    // interface IAuthContext {
    //     user: Iuser;
    //     setUser: (token: string) => void;
    // }

    // // Initial state
    // const INITIAL_STATE: Iuser = {
    //     token: "",
    //     user: null,
    // };

    // // ✅ Create Context
    // const AuthContext = createContext<IAuthContext>({
    //     user: INITIAL_STATE,
    //     setUser: () => { },
    // });


    // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    //     const [user, setUserState] = useState<Iuser>(INITIAL_STATE);
    //     const setUser = async (token: string) => {
    //         (await cookies()).set("token", token);
    //         const verifiedUser = await varvfiy(token);
    //         setUserState({ token, user: verifiedUser });
    //     };

    //     useEffect(() => {
    //         const token = (await cookies()).get("token");
    //         if (typeof token === "string") setUser(token);
    //     }, []);

    //     return (
    //         <AuthContext.Provider value={{ user, setUser }}>
    //             {children}
    //         </AuthContext.Provider>
    //     )
    // };

    // // ✅ Hook to use context
    // export const useAuth = () => useContext(AuthContext);
