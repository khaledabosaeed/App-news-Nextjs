import sql from "better-sqlite3";

const db = sql("news.db");

const items = [
  {
    id: 1,
    title: "Forget office simple level national.",
    slug: "his-effort-spend",
    image: "https://www.lorempixel.com/877/894",
    content: "Us whatever serve marriage recent agree girl. Institution fire cultural lawyer old middle. Coach sea program impact.",
    author: "Kristina Ruiz",
    author_email: "vjones@larson.com",
    date: 1749631755427,
    category: "sports"
  },
  {
    id: 2,
    title: "Scientist even stand leave.",
    slug: "community-country",
    image: null,
    content: "Level day very policy management. Specific security yard entire. Data decide fall. Light upon situation dog appear tax.",
    author: "Andrew Howell",
    author_email: "tcameron@yahoo.com",
    date: 1730796555427,
    category: "sports"
  },
  {
    id: 3,
    title: "Moment out continue character case.",
    slug: "civil-behind",
    image: "https://www.lorempixel.com/39/34",
    content: "Reality stand political nature all where set. Want personal democratic hospital early sing. Side whom soldier floor. Far drive rise what work rather pass pressure. Owner name marriage himself happy. Occur place natural upon medical site may.",
    author: "Michael Jones",
    author_email: "salinascassandra@gmail.com",
    date: 1734943755428,
    category: "sports"
  },
  {
    id: 4,
    title: "Story itself indeed tree.",
    slug: "cut-side-act-here",
    image: null,
    content: "Pull top there of. Not know officer generation record customer. Either when quickly great center light education find. Happen worker most wonder bit recent. Offer which policy century both crime win. Part interview fast help manager.",
    author: "Matthew Thompson",
    author_email: "greerbrenda@yahoo.com",
    date: 1746607755429,
    category: "sports"
  },
  {
    id: 5,
    title: "Agreement act chance cause.",
    slug: "resource-quickly",
    image: "https://placekitten.com/583/140",
    content: "Economy necessary base unit. Activity what energy movement himself son. Account mother safe trade cut teach ball.",
    author: "Adam Compton",
    author_email: "kristennixon@hotmail.com",
    date: 1742633355429,
    category: "sports"
  },
  {
    id: 6,
    title: "Him most Mr very in certain likely.",
    slug: "resource-put-argue",
    image: "https://dummyimage.com/902x572",
    content: "Son religious foot despite mouth. Admit throughout family anything. Whose write without study force real real. Career eight dark challenge trade. Southern couple kind happy partner.",
    author: "Frederick Casey",
    author_email: "dustin89@gmail.com",
    date: 1729154955430,
    category: "global"
  },
  {
    id: 7,
    title: "Space focus safe four.",
    slug: "within-every-speech",
    image: "https://dummyimage.com/634x434",
    content: "Particular develop wear discover score pass senior agreement. Surface could difference network idea science finish. Turn big while forward produce thank allow career. Radio open hope serious officer right meet. Poor certain certain fall soon into.",
    author: "Eric Arias",
    author_email: "jessica66@hotmail.com",
    date: 1751273355430,
    category: "global"
  },
  {
    id: 8,
    title: "Allow buy top court course.",
    slug: "performance-often",
    image: "https://placekitten.com/947/681",
    content: "Want else here. Important blue nation. Environmental hotel accept across choose upon theory off. Class bad that account authority our.",
    author: "Mark Davis",
    author_email: "patricialewis@gmail.com",
    date: 1747730955431,
    category: "global"
  },
  {
    id: 9,
    title: "Break back about less kid safe charge tree.",
    slug: "vote-where-between",
    image: "https://placeimg.com/218/854/any",
    content: "Identify listen major behind both place hand. Book third ground. Majority environmental house culture Mr. Tonight we such study wide central start wife. Expect look notice happen safe national inside.",
    author: "Tammy Lambert",
    author_email: "uglover@jenkins.com",
    date: 1742892555432,
    category: "global"
  },
  {
    id: 10,
    title: "Employee American economy agree.",
    slug: "at-control-despite",
    image: "https://dummyimage.com/73x417",
    content: "Hundred discover candidate environment manager direction star practice. Bill human fight capital structure free notice remember. Her maybe around. Animal name agreement television prove pretty. Sign again begin human benefit security road.",
    author: "Pamela Estrada",
    author_email: "roycallahan@hotmail.com",
    date: 1749026955432,
    category: "global"
  }
];

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    image TEXT ,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    author_email TEXT NOT NULL,
    date INTEGER NOT NULL,
    category TEXT NOT NULL
  )
`
).run();
const insertToData = () => {
  const insertCommand = db.prepare(
    `INSERT INTO news (
      title,
      slug,
      image,
      content,
      author,
      author_email,
      date,
      category
    ) VALUES (
      @title,
      @slug,
      @image,
      @content,
      @author,
      @author_email,
      @date,
      @category
    )`
  );

  for (const item of items) {
    insertCommand.run(item);
  }
};
insertToData();
