  'use server';

import slugify from "slugify";
import xss from 'xss';
import { addArticl } from "./news.service";
import { redirect } from 'next/navigation'
import { AllwoowllAll } from "../data/catagory";

const hundleSubmit = async ( prevStata:{valdtion:string[]}, fromData: FormData) => {
  const title = xss(fromData.get('title') as string);
  const newItem: News.Idata = {
    title: title,
    content: fromData.get('content') as string,
    author: fromData.get('author') as string,
    authorEmail: fromData.get('author-email') as string,
    image: fromData.get('imageUrl') as string,
    slug: slugify(title, { lower: true }),
    date: fromData.get('date') as string,
    category: fromData.get('category') as string,
  }
  const valdtion : string[] = []
  if (!title) {
    valdtion.push("the titel is required")
  }
  if (!newItem.content) {
    valdtion.push("the content is required")
  }
  if (!newItem.author) {
    valdtion.push("the author is required")
  }
  if (!newItem.authorEmail) {
    valdtion.push("the author-email is required")
  }
  if (!newItem.image) {
    valdtion.push("the imageUrl is required")
  }
  if (!newItem.date) {
    valdtion.push("the date is required")
  }
  if (!AllwoowllAll.includes(fromData.get('category') as string)) {
    valdtion.push("the category is not allowed")
  }
  if (valdtion.length ) {
  return{
    valdtion
  }
  }

  addArticl(newItem);
  redirect("/")
}
export {
  hundleSubmit
}