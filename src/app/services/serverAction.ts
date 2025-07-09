import slugify from "slugify";
import xss from 'xss';
import { addArticl } from "./news.service";
import { redirect } from 'next/navigation'

const hundleSubmit = async (fromData: FormData) => {
  'use server';
  const title = xss(fromData.get('title') as string);
  const newItem: News.Idata = {
    title: title,
    content: fromData.get('content') as string,
    author: fromData.get('author') as string,
    authorEmail: fromData.get('author-email') as string,
    image: fromData.get('imageUrl') as string,
    slug: slugify(title,{lower:true}),
    date: fromData.get('date') as string,
    category: fromData.get('category') as string,
  }
  console.log(newItem);
  addArticl(newItem);
  redirect("/")
}
export {
  hundleSubmit
}