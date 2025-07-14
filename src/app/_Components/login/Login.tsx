'use client'
// import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { varvfiy } from '../../utils/auth';
// import  jwt  from 'jsonwebtoken';
// import styles from './Login.module.css'
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
            /**
             * write here the massage for not found user or password
             */
        }
        console.log(req);
    }
    return (
        <div >
            <h1>Login</h1>
            <form onSubmit={hundleSubmit}>
                <label>Email</label>
                <input
                    id='email' type="email" title="Email" placeholder='Enter your email' />
                <label>Password</label>
                <input
                    id='password' type="password" title="Password" placeholder='Enter your password' />
                <button type="submit" >Login</button>
                <Link href={"/signUp"} type="submit" >Register</Link>
                <button type="submit" >Login with Google</button>
            </form>
        </div>
    );
}

export default Login