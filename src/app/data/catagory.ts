const Catagorydata: News.catagory[] = [
    {
        title: "sports",
        image: "/CatagoryImage/sports.jpg",
        Desc: "The latest business news headlines and breaking stories.",
    },
    {
        title: "global",
        image: "/CatagoryImage/News.jpg",
        Desc: "Stay up-to-date with the latest health news and trends.",
    },
    {
        title: "Technology",
        image: "/CatagoryImage/technology.jpg",
        Desc: "Stay up-to-date with the latest technology news and trends.",
    },
    {
        title: "Health",
        image: "/CatagoryImage/health.jpg",
        Desc: "Discover news on wellness, medicine, fitness, and more.",
    },
    {
        title: "Politics",
        image: "/CatagoryImage/politics.jpg",
        Desc: "Breaking political news, analysis, and updates from around the world.",
    },
    {
        title: "Entertainment",
        image: "/CatagoryImage/Entertainment.jpg",
        Desc: "Celebrity news, movie releases, TV shows, and pop culture.",
    },
    {
        title: "Science",
        image: "/CatagoryImage/science.jpg",
        Desc: "Explore discoveries, space research, environment, and more.",
    },
    {
        title: "Education",
        image: "/CatagoryImage/Education.png",
        Desc: "Updates and developments from the education sector worldwide.",
    },
    {
        title: "Business",
        image: "/CatagoryImage/finance.png",
        Desc: "Get insights into markets, startups, and global business trends.",
    },
];

const AllwoowllAll = Catagorydata.map(item => item.title);
export {
    Catagorydata,
    AllwoowllAll
}