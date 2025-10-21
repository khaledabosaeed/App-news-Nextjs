'use client'
import Link from 'next/link';
import React, { useContext } from 'react'

import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css'
import { AuthContext } from '../../context/auth.context';
import { useRouter, useSearchParams } from "next/navigation";
function Login() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const auth = useContext(AuthContext);
    if (!auth) return null;
    const { login } = auth
    const hundleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (e.currentTarget["email"] as HTMLInputElement).value;
        const password = (e.currentTarget["password"] as HTMLInputElement).value;
        login(email, password)
        const redirectPath = searchParams.get("redirect") || "/";
        router.push(redirectPath);
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Login</h1>
                <form onSubmit={hundleSubmit} className={styles.form}>
                    <label className={styles.label}>Email</label>
                    <input className={styles.input}
                        id='email' type="email" title="Email" placeholder='Enter your email' />
                    <label className={styles.label}>Password</label>
                    <input className={styles.input}
                        id='password' type="password" title="Password" placeholder='Enter your password' />
                    <button type="submit" className={styles.button} >Login</button>
                    <Link href={"/signUp"} type="submit" className={styles.link}>Register</Link>
                    <button type="submit" className={styles.googleButton} >Login with Google</button>
                </form>
            </div>
        </div>
    );
}

export default Login