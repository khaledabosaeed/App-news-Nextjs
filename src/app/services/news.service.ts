import { notFound } from "next/navigation";
import sql from 'better-sqlite3'
const db = sql('news.db')
const getNews = (catagory: string): News.item[] => {
    const news = db.prepare('SELECT * FROM news WHERE category = ?').all(catagory);
    console.log(news);
    
    return news as News.item[];
}
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
/**
 * @deprecated
 */
const fetchData = async (country: string, category: string) => {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`, {
        method: "GET"
    });
    const newsResponse = (await res.json()) as News.IRespons;

    let latestNews: News.item[] = [];
    if (newsResponse.status === 'ok' && newsResponse.articles.length > 0) {
        latestNews = newsResponse.articles.map(item => ({
            title: item.title,
            img: item.urlToImage,
            Desc: item.description,
            id: '1',
            catagory: ''
        }));
    } else {
        notFound();
    }
    return latestNews
};
export {
    fetchData,
    getNews
}