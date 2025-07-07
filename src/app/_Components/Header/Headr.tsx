'use client'
import React from 'react'
import styles from './Headr.module.css'
import Navbar from './Navbar'

function Headr() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        📰 <span>NewsNow</span>
      </div>
      <Navbar />
    </div>
  )
}

export default Headr