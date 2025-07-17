'use client'
import Link from 'next/link';
import React from 'react'
import { varvfiy } from '../../utils/auth';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css'
function Login() {
    const hundleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = (e.currentTarget["email"] as HTMLInputElement).value;
        const password = (e.currentTarget["password"] as HTMLInputElement).value;

        const req = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include", // required if token is set in cookies by server
        });
        if (req.ok) {
                window.location.href = "/add-news";
            const token = await req.text();
            console.log("token from login"+token);
            const user = await (varvfiy(token));
            localStorage.setItem("auth-user", JSON.stringify(user))
        } else {
            toast.error("Invalid email or password!", {
                position: "top-right",
            });
        }
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