import React from 'react'
import styles from './Headr.module.css'
function Headr() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        📰 <span>NewsNow</span>
      </div>

      <nav className={styles['nav-links']}>
        <a href="/v">Home</a>
        <a href="/world">World</a>
        <a href="/sports">Sports</a>
        <a href="/technology">Tech</a>
        <a href="/contact">Contact</a>
      </nav>
    </div>
  )
}

export default Headr