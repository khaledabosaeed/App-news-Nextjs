'use clinet'
import React from 'react'
import styles from './formPage.module.css'
import { useFormStatus } from 'react-dom'

function Submit() {
    const { pending } = useFormStatus()
    return (
        pending ? "Submiting"
            : <button type="submit" className={styles.button}>Submit</button>
    )
}

export default Submit