import { getNews } from '@/src/app/services/news.service';
import MainContiner from './MainContiner';
import { Suspense } from 'react';
import styles from './page.module.css'
import { Metadata } from 'next';
// import Loading from './loading'; 
interface IProps {
    params: Promise<{ category: string }>
}
export const generateMetadata = async ({ params }: IProps): Promise<Metadata> => {
  const slug = (await params).category;
  return {
    title: `${slug.toUpperCase()} News`
  };
}
let category = ''
const Page = async ({ params }: IProps) => {
    category = (await params).category;
    const latestNews: News.Idata[] = getNews(category);
    return (
        <div >
            <h1 className={styles.title}>{category.toUpperCase() + ""}NEWS</h1>
            <Suspense fallback={<span className={styles.loader}></span>}>
                <MainContiner latestNews={latestNews} catagory={category} />
            </Suspense >
        </div >
    )
}

export default Page