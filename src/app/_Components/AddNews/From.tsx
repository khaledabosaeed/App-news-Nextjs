
'use client'
import React, { useActionState } from 'react'
import styles from './formPage.module.css'
import { hundleSubmit } from '../../services/serverAction'
import Submit from './Submit'
function From() {
    const [state, formAction, pending] = useActionState(hundleSubmit, { valdtion: [] })
    console.log(state);
    console.log(pending);
    return (
        <div className={styles.wrapper}>
            <form className={styles.form} action={formAction}>
                <h1 className={styles.heading}>Add News Article</h1>
                <div className={styles.field}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        maxLength={300}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="content">Content</label>
                    <input type="text" id="content" name="content" required />
                </div>
                <div className={styles.field}>
                    <label htmlFor="imageUrl">Image News URL</label>
                    <input type="text" id="imageUrl" name="imageUrl" maxLength={3000} required />
                </div>
                <div className={styles.field}>
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" />
                </div>
                <div className={styles.field}>
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category">
                        <option value="global">Global</option>
                        <option value="sports">Sports</option>
                        <option value="business">Business</option>
                        <option value="technology">Technology</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                        <option value="science">Science</option>
                    </select>
                </div>
                <input type="hidden" name="author" value="khaled" />
                <input type="hidden" name="author-email" value="khaled@example.com" />
                <Submit />
                <ul className={styles.error}>
                    {state.valdtion.map((valdtion) => {
                        return <li key={valdtion}>{valdtion}</li>;
                    })}
                </ul>
            </form>
        </div>
    );
}

export default From