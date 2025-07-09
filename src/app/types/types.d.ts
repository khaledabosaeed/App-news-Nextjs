// import { catagory } from './types.d';
declare namespace News {
    export interface INews {
        description: string
        title: string
        urlToImage: string
        id: ""
    }
    export interface IRespons {
        status: string;
        articles: INews[];
        totalResults: number;
    }
    export interface item {
        title: string;
        img: string | null;
        Desc: string;
        id: string;
        catagory: string;
    }
    export interface catagory {
        title: string;
        image: string;
        Desc: string;
    }
    export interface Idata {
        title: string,
        slug: string,
        image: string,
        content: string,
        author: string,
        authorEmail: string,
        date: string,
        category: string
    }
}