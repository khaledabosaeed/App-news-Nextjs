import React from 'react'
import styles from './formPage.module.css'

function Page() {
  const hundleSubmit = async (fromData: FormData) => {
    'use server';
    const newItem: News.Idata = {
      title: fromData.get('title') as string,
      content: fromData.get('content') as string,
      author: fromData.get('author') as string,
      authorEmail: fromData.get('author-email') as string,
      image: fromData.get('imageUrl') as string,
      slug: fromData.get('slug') as string,
      date: fromData.get('date') as string,
      category: fromData.get('category') as string,
    }
    console.log(newItem);

  }
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} action={hundleSubmit}>
        <h1 className={styles.heading}>Add News Article</h1>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name='title' />
        </div>
        <div className={styles.field}>
          <label htmlFor="content">Content</label>
          <input type="text" id="content" name='content' />
        </div>
        <div className={styles.field}>
          <label htmlFor="imageUrl">Image News URL</label>
          <input type="text" id="imageUrl" name='imageUrl' />
        </div>
        <div className={styles.field}>
          <label htmlFor="slug">slug</label>
          <input type="text" id="slug" name='slug' />
        </div>
        <div className={styles.field}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name='date' />
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

        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  )
}

export default Page
