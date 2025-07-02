

import Image from 'next/image'
import { fetchData } from '@/services/news.service';
import styles from './page.module.css'
interface Iporops {
    params: Promise<{ category: string }>
}
const country = "us"
let category = ''

const Page = async ({ params }: Iporops) => {
    category = (await params).category;
    const latestNews: News.item[] = await fetchData(country, category);
    return (
        <div>
            <div className={styles.Continer}>
                <h1 className={styles.title}>{category.toUpperCase() + " "}NEWS</h1>
                <div className={styles.continer}>
                    {latestNews.map((item, index) => {
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
        </div>

    )
}

export default Page