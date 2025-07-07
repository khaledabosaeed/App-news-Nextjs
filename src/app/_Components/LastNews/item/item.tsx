import Link from 'next/link'
import React from 'react'
import styles from '../LastNews.module.css'

interface Iprops {
    title: string,
    summary: string,
    href: string,
    isHighlited: boolean
}
function Item({ title, summary, href, isHighlited }: Iprops) {
    return (
        <div className={styles.newsGrid}>
            <Link href={href} className={`${styles.newsCard} ${isHighlited ? styles.fetuerd : ''}`}>
                <h3>{title}</h3>
                <p>{summary}</p>
            </Link>
        </div>
    )
}

export default Item