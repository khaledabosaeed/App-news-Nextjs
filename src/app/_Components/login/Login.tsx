'use client'
// import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { varvfiy } from '../../utils/auth';
// import  jwt  from 'jsonwebtoken';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css'
function Login() {
    const hundleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const eamil = e.currentTarget['email'].value;
        const password = e.currentTarget['password'].value;
        console.log(eamil);
        console.log(password);
        const req = await fetch('/api/user/login', {
            method: "POST",
            body: JSON.stringify({ eamil, password }),
            headers: { 'Content-Type': "appliction/josn" }
        })
        if (req.ok) {
            const token = await req.text();
            console.log(token);
            const user = varvfiy(token);
            // if you dont have access token and user you can use the jwt.decode to decode the token and get the user data
            // const user1= jwt.decode(token)
            // put the auth iside the auth context
            // and inside the local storage
            localStorage.setItem("auth-token", token);
            localStorage.setItem("auth-user", JSON.stringify(user));
            redirect("/");
        } else {
            toast.error("Invalid email or password!", {
                position: "top-right",
            });
        }
        console.log(req);
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