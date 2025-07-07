import { fetchData } from '@/src/app/services/news.service';
import styles from './page.module.css'
import Sidebar from './Sidbar';
import MainContiner from './MainContiner';

interface Iporops {
    params: Promise<{ category: string }>
}
const country = "us"
let category = ''
const Page = async ({ params }: Iporops) => {
    category = (await params).category;
    const latestNews: News.item[] = await fetchData(country, category);
    return (
        <div className={styles.mainContinar}>
            <Sidebar />
            <MainContiner latestNews={latestNews} catagory={category} />
        </div>
    )
}

export default Page