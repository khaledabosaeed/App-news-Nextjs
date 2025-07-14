import React from 'react'
import styles from './page.module.css'
function Loading() {
    return (
        <div>
            <span className={styles.loader}></span>
        </div>
    )
}

export default Loading