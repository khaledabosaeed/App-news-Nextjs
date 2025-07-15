'use client'
import { redirect } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
import { varvfiy } from '../../utils/auth';
import styles from "./signUp.module.css"
function SignUp() {
    const hundleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;

        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const role = (form.elements.namedItem("role") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        const req = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, name, password, role }),
            headers: { "Content-Type": "appliction/josn" },
            credentials: "include",
        });
        if (req.ok) {
            const token = await req.text();
            console.log(token);
            const user = varvfiy(token);
            localStorage.setItem("auth-token", token);
            localStorage.setItem("auth-user", JSON.stringify(user));
            toast.success("Login Success!", {
                position: "top-right",
            });
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
                    <label className={styles.label}>Name</label>
                    <input className={styles.input}
                        id='name' type="text" title="Name" placeholder='Enter your name' />
                    <label className={styles.label}>Role</label>
                    <input className={styles.input}
                        id='role' type="text" title="Role" placeholder='Enter your role' />
                    <label className={styles.label}>Password</label>
                    <input className={styles.input}
                        id='password' type="password" title="Password" placeholder='Enter your password' />
                    <button type="submit" className={styles.button} >SignUp</button>
                    <button type="submit" className={styles.link}>SignUp</button>
                    <button type="submit" className={styles.googleButton} >SignUp with Google</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp