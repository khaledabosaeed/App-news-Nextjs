import React from 'react'
import styles from './singIn.module.css'
function SignIn() {
    return (
        <section className={styles.signinsection}>
            <div className={styles.signincontent}>
                <h2>Ready to share your news?</h2>
                <p>
                    Join our growing community of contributors and start publishing news that matters. Share your stories, your opinions, and your voice with the world.
                </p>
                <a href="/user/login" className={styles.signinbutton}>Sign In</a>

                <div className={styles.faqsection}>
                    <h3>🧠 Frequently Asked Questions</h3>

                    <details>
                        <summary>Do I need an account to post news?</summary>
                        <p>Yes, you need to sign in to submit and manage your news articles.</p>
                    </details>

                    <details>
                        <summary>Is posting news free?</summary>
                        <p>Absolutely! Sharing your stories on NewsNow is 100% free.</p>
                    </details>

                    <details>
                        <summary>Can I edit my news after publishing?</summary>
                        <p>Yes, you can edit or delete your own news anytime after logging in.</p>
                    </details>

                </div>
            </div>
        </section>)
}

export default SignIn