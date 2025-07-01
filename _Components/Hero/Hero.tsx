import React from 'react'
import styles from "./Hero.module.css"
import Link from 'next/link'
function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>Stay Informed. Stay Ahead.</h1>
      <p className={styles.heroSubtitle}>
        Get the latest news from around the world — all in one place.
      </p>
      <Link href="/world" className={styles.ctaButton}>
        Explore Headlines
      </Link>
    </section>
  )
}

export default Hero