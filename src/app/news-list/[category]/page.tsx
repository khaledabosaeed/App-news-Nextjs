import { fetchData } from '@/src/app/services/news.service';
import MainContiner from './MainContiner';
import { Suspense } from 'react';
import styles from './page.module.css'
// import Loading from './loading'; 
interface Iporops {
    params: Promise<{ category: string }>
}
const country = "us"
let category = ''
const Page = async ({ params }: Iporops) => {
    category = (await params).category;
    const latestNews: News.item[] = await fetchData(country, category);
    return (
        <div >
            <h1 className={styles.title}>{category.toUpperCase() + ""}NEWS</h1>

            <Suspense fallback={<span className={styles.loader}></span>}>
                <MainContiner latestNews={latestNews} catagory={category} />
            </Suspense >
            <h2>this is </h2>
        </div >
    )
}

export default Page