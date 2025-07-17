'use client'
import Link from 'next/link'
import React from 'react'
import styles from './Headr.module.css'
import { usePathname } from 'next/navigation'
function Navbar() {
    const path = usePathname();
    const handleLogout = async () => {
        await fetch('api/auth/login', {
            method: 'DELETE',
        });
    };
    return (
        <nav className={styles['nav-links']}>
            <Link href="/" className={path === '/' ? styles.slected : undefined}>Home</Link>
            <Link href="/add-news" className={path === '/add-news' ? styles.slected : undefined}>Add news</Link>
            <Link href="/Admin" className={path.startsWith('/Admin') ? styles.slected : undefined}>Admin </Link>
            <Link href="/Catagories" className={path.startsWith('/Catagories') ? styles.slected : undefined}>Catagories</Link>
            <button className={styles.logout} onClick={handleLogout} >logout</button>
        </nav>
    )
}

export default Navbar