'use client'
import React, { useState } from 'react'
import styles from './Headr.module.css'
import Navbar from './Navbar'

function Headr() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        📰 <span>NewsNow</span>
      </div>
      {/* Hamburger Button */}
      <button className={styles.burger} onClick={toggleMenu}>☰</button>

      <Navbar isMenuOpen={isMenuOpen} />
    </div>
  )
}

export default Headr