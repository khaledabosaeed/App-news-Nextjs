import React from 'react'
import styles from "./AboutUs.module.css";
function AboutUs() {
    return (
        <section className={styles.aboutsection}>
            <div className={styles.aboutcontent}>
                <h2>📢 About NewsNow</h2>
                <p>
                    NewsNow is a user-powered news platform where anyone can stay informed and share their voice with the world. Whether you&apos;re passionate about technology, sports, health, or global events — this is your space to read, contribute, and connect.
                </p>
                <p>
                    Built with simplicity and openness in mind, our goal is to give everyone a platform to report, react, and reflect on what truly matters.
                </p>
            </div>
        </section>
    )
}

export default AboutUs