import React from 'react'
import styles from './page.module.css';
import Link from 'next/link';

function NotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.notFoundBox}>
        <h1>404</h1>
        <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default NotFound