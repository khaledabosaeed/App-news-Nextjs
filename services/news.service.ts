import { notFound } from "next/navigation";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const fetchData = async (country: string, category: string) => {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`, {
        method: "GET"
    });
    const newsResponse = (await res.json()) as News.IRespons;

    let latestNews: News.item[] = [];
    if (newsResponse.status === 'ok'&&newsResponse.articles.length > 0) {
        latestNews = newsResponse.articles.map(item => ({
            title: item.title,
            img: item.urlToImage,
            Desc: item.description,
            id: '1',
        })); 
    } else {
        notFound();
    }
    return latestNews
};
export {
    fetchData
}