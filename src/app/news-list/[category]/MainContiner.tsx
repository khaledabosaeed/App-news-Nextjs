import React from 'react'
import styles from './page.module.css'
import Image from 'next/image';

interface Iprops {
    latestNews: News.item[]
    catagory: string
}
function MainContiner(props: Iprops) {
    return (
        <div className={styles.Continer}>
            <h1 className={styles.title}>{props.catagory.toUpperCase() + " "}NEWS</h1>
            <div className={styles.continer}>
                {props.latestNews.map((item, index) => {
                    return (
                        <div key={index} className={styles.item}>
                            <h1>{item.title}</h1>{
                                item.img !== null &&
                                <div className={styles.imgContiner}>
                                    <Image
                                        className={styles.img}
                                        src={item.img}
                                        alt='new-image'
                                        style={{ objectFit: "cover" }}
                                        fill
                                    />
                                </div>
                            }
                            <p>{item.Desc}</p>
                        </div>
                    )
                })
                }
            </div>
        </div >
    )
}

export default MainContiner