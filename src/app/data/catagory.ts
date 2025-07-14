const Catagorydata: News.catagory[] = [
    {
        title: "sports",
        image: '/CatagoryImage/finance.png',
        Desc: "The latest business news headlines and breaking stories.",
    },
    {
        title: "global",
        image: '/CatagoryImage/sports.jpg',
        Desc: "Stay up-to-date with the latest health news and trends.",
    },
    {
        title: "Technology",
        image: '/CatagoryImage/politics.jpg',
        Desc: "Stay up-to-date with the latest technology news and trends.",
    },
];

const AllwoowllAll = Catagorydata.map(item => item.title);
export{
    Catagorydata,
    AllwoowllAll
}