import React from 'react'
import styles from './Catagory.module.css'
import Image from 'next/image'
import Link from 'next/link'
interface Iprops {
    data: News.catagory[]
}
function Catagory(props: Iprops) {
    return (
      <>
        <h2 className={styles.catagoryTitle}> Our Catagory</h2>
        <div className={styles.catagory}>
          {props.data.map((item, index) => {
            return (
              <Link
                href={"/news-list/" + item.title}
                key={index}
                className={styles.link}
              >
                <div className={styles.catagoryItem}>
                  <h1 className={styles.catagoryTitle}>{item.title}</h1>
                  <div className={styles.imgContiner}>
                    <Image
                      className={styles.img}
                      src={item.image}
                      alt="new-image"
                      style={{ objectFit: "cover" }}
                      fill
                    />
                  </div>
                  <p className={styles.categoryDescription}>{item.Desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
}


export default Catagory