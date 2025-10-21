import React from 'react'
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';

interface Iprops {
    latestNews: News.Idata[]
    catagory: string
}
function MainContiner(props: Iprops) {
    return (
        <div className={styles.Continer}>
            <div className={styles.continer}>
                {props.latestNews.map((item, index) => {
                    return (
                        <Link
                        href={`/news/${item.slug}`}
                         key={index} className={styles.item} >
                            <h1>{item.title}</h1>
                            <div className={styles.imgContiner}>
                                <Image
                                    className={styles.image}
                                    src='/CatagoryImage/finance.png'
                                    alt='new-image'
                                    style={{ objectFit: "cover" }}
                                    fill
                                />
                            </div>
                            <p>{item.content}</p>
                        </Link>
                    )
                })
                }
            </div>
        </div >
    )
}

export default MainContiner