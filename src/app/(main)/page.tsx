import Hero from "@/src/app/_Components/Hero/Hero";
// import styles from "./page.module.css";
import LastNews from "@/src/app/_Components/LastNews/LastNews";
import Catagory from "@/src/app/_Components/Catagory/Catagory";
import { Catagorydata } from "../data/catagory";
import SignIn from "../_Components/signIn/SignIn";
import AboutUs from "../_Components/AboutUS/AboutUs";

export default function Home() {
  const randomCategories = [...Catagorydata]
    .sort(() => Math.random() - 0.5) // shuffle array
    .slice(0, 3);
  return (
    <div>
      <Hero />
      <LastNews />
      <Catagory data={randomCategories} />
      <SignIn />
      <AboutUs />
    </div>
  );
}
