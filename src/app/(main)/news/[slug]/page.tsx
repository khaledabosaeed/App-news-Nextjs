import React from 'react'
import { getArticl } from '../../../services/news.service';
import ItemIdata from './ItemIdata';
import { Metadata } from 'next';


interface Iprops {
    params: Promise<{ slug: string }>
}

export const generateMetadata = async ({ params }: Iprops): Promise<Metadata> => {
    const slug = await (await (params)).slug;
    const article = getArticl(slug);

    return {
        title: `${article.title}`,
        authors:{name:article.author}
    }
}

const Page = async (props: Iprops) => {
    const slug = await (await (props.params)).slug;
    const article = getArticl(slug);
    return (
        <>
            <ItemIdata article={article} />
        </>
    )
}

export default Page 