import React from 'react'
import { getArticl } from '../../../services/news.service';
import ItemIdata from './ItemIdata';


interface Iprops {
    params: Promise<{ slug: string }>
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