import React from 'react'
import styles from './ItemIdata.module.css'
import Image from 'next/image'

interface IProps {
  article: News.Idata
}

function ItemIdata({ article }: IProps) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{article.title}</h1>
        {article.image && (
          <div className={styles.imgWrapper}>
            <Image
              className={styles.image}
              src={article.image}
              alt="news-image"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        )}
        <p className={styles.content}>{article.content}</p>
      </div>
    </div>
  )
}

export default ItemIdata
