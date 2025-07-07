'use client'
import React, { useEffect, useState } from 'react'
import styles from './LastNews.module.css'
import Item from './item/item';
function LastNews() {
    const [highlited, setHighlited] = useState(0)

    useEffect(() => {
        const sliderInt = setInterval(() => {
            setHighlited(old => (old + 1) % 3)
        }, 3000)
        return () => {
            clearInterval(sliderInt)
        }
    }, [])

    const newsItems = [
        {
            title: "Global Economy Faces Slowdown",
            summary: "Analysts predict a turbulent Q4 as inflation remains stubborn.",
            href: "/world/economy-slowdown"
        },
        {
            title: "Champions League Final Highlights",
            summary: "A thrilling final ends in dramatic penalty shootout.",
            href: "/sports/champions-league"
        },
        {
            title: "AI Takes Center Stage at Tech Expo",
            summary: "Breakthroughs in AI and robotics showcased this week.",
            href: "/technology/ai-expo"
        },
    ];

    return (
        <section className={styles.newsSection}>
            <h2 className={styles.newsHeading}>🗞️ Latest News</h2>
            <div className={styles.newsGrid}>
                {newsItems.map((item, index) =>
                (<Item
                    key={index}
                    title={item.title}
                    href={item.href}
                    summary={item.summary}
                    isHighlited={index === highlited}
                />))}
            </div>
        </section>
    )
}

export default LastNews