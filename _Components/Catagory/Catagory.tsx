import React from 'react'
import styles from './Catagory.module.css'
import Image from 'next/image'
import Link from 'next/link'
interface Iprops {
    data: News.catagory[]
}
function Catagory(props: Iprops) {
    return (
        <div className={styles.catagory}>
            {props.data.map((item, index) => {
                return (
                    <Link href={"/news-list/" + item.title} key={index} >
                        <div className={styles.catagoryItem} >
                            <h1>{item.title}</h1>
                            <div className={styles.imgContiner}>
                                <Image
                                    className={styles.img}
                                    src={item.img}
                                    alt='new-image'
                                    style={{ objectFit: "cover" }}
                                    fill
                                />
                            </div>
                            <p>{item.Desc}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}


export default Catagory