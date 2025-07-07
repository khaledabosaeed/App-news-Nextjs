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
    }
    export interface catagory {
        title: string;
        img: string ;
        Desc: string;
    }

}