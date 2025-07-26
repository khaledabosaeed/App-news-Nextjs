'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import styles from './Headr.module.css'
import { usePathname } from 'next/navigation'
import { AuthContext } from '../../context/auth.context'
function Navbar() {
    const path = usePathname();
    const auth = useContext(AuthContext);
    if (!auth) return null;
    const { logout } = auth

    return (
        <nav className={styles["nav-links"]}>
            <Link href="/" className={path === "/" ? styles.slected : undefined}>
                Home
            </Link>
            <Link
                href="/add-news"
                className={path === "/add-news" ? styles.slected : undefined}
            >
                Add news
            </Link>
            <Link
                href="/Admin"
                className={path.startsWith("/Admin") ? styles.slected : undefined}
            >
                Admin{" "}
            </Link>
            <Link
                href="/Catagories"
                className={
                    path.startsWith("/Catagories") ? styles.slected : undefined
                }
            >
                Catagories
            </Link>
            {auth.user?.user ? (
                <button onClick={logout} className={styles.logout}>
                    Logout
                </button>
            ) : (
                <Link href="/user/login" className={styles.login}>Login</Link>
            )}
        </nav>
    );
}

export default Navbar