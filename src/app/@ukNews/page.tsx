import React from 'react'
import { fetchData } from '../services/news.service'
import MainContiner from '../news-list/[category]/MainContiner';

const catagory = 'business'
async function Page() {
    const latestNews: News.item[] = await fetchData('us', catagory);
    return (
        <div>
            <MainContiner latestNews={latestNews.slice(0, 3)} catagory={catagory} />
        </div >
    )

}
export default Page