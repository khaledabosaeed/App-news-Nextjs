import React from 'react'
import styles from "./footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footercontent}>
                <h3>📰 NewsNow</h3>
                <ul className={styles.footerlinks}>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/terms">Terms</a></li>
                </ul>
                <p className={styles.footercopy}>© {new Date().getFullYear()} NewsNow. All rights reserved.</p>
            </div>
        </footer>)
}

export default Footer