import sql from 'better-sqlite3'
const db = sql('news.db');

const getNews = (catagory: string): News.Idata[] => {
    const news = db.prepare(`SELECT * FROM items WHERE category = ?`).all(catagory)
    console.log(news);
    return news as News.Idata[];
}
const getArticl = (slug: string): News.Idata => {
    return db.prepare(`SELECT * FROM items WHERE slug = ?`).get(slug) as News.Idata;
}
const addArticl = (item: News.Idata) => {
    db.prepare(`INSERT INTO items (
    title,
    slug,
    image,
    content,
    author,
    author_email,
    date,
    category
    )
VALUES (
    @title,
    @slug,
    @image,
    @content,
    @author,
    @authorEmail,
    @date,
    @category)`)
        .run(item);
}

const addUser = (user: News.Iuser) => {
    db.prepare(`INSERT INTO items (
    email,
    name,
    password,
    role
    )
VALUES (
    @email,
    @name,
    @password,
    @role,`).run(user);
}
export {
    getNews,
    getArticl,
    addArticl,
    addUser
}





/**
 * @deprecated
 */
// const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
// const fetchData = async (country: string, category: string) => {
//     const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`, {
//         method: "GET"
//     });
//     const newsResponse = (await res.json()) as News.IRespons;

//     let latestNews: News.item[] = [];
//     if (newsResponse.status === 'ok' && newsResponse.articles.length > 0) {
//         latestNews = newsResponse.articles.map(item => ({
//             title: item.title,
//             img: item.urlToImage,
//             Desc: item.description,
//             id: '1',
//             catagory: ''
//         }));
//     } else {
//         notFound();
//     }
//     return latestNews
// };
