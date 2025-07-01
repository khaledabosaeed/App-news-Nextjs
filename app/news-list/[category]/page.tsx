'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Iporops {
    params: Promise<{ category: string }>
}
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const country = "us"
let category = ''
const Page = ({ params }: Iporops) => {
    const [latsetNwes, SetNews] = useState<News.item[]>([]);
    const [loading, setloading] = useState(true)
    const Solve = async () => {
        category = (await params).category;

        if (!category) return
        setloading(true)
        fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`, {
            method: "GET"
        })
            .then(res => res.json() as Promise<News.IRespons>)
            .then(res => {
                const latestNews: News.item[] = res.articles.map(item => ({
                    title: item.title,
                    img: item.urlToImage,
                    Desc: item.description,
                    id: '1',
                }))
                SetNews(latestNews);
            })
            .catch().finally(() => {
                setloading(false)
            })
    }
    useEffect(() => {
        Solve();
    }, [])
    return (
        <div>
            <h1>{category.toUpperCase()+" "}NEWS</h1>
            {loading ? <div>Loading ...</div> :
                latsetNwes.map((item, index) => {
                    return (
                        <div key={index}>
                            <h1>{item.title}</h1>{
                                item.img !== null && <Image
                                    src={item.img}
                                    alt='new-image'
                                    width={80}
                                    height={80}
                                    style={{ objectFit: "cover" }} />
                            }
                            <p>{item.Desc}</p>
                        </div>
                    )
                })
            }
        </div >
    )
}

export default Page