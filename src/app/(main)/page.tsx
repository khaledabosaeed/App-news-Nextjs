import Hero from "@/src/app/_Components/Hero/Hero";
// import styles from "./page.module.css";
import LastNews from "@/src/app/_Components/LastNews/LastNews";
import Catagory from "@/src/app/_Components/Catagory/Catagory";
import {Catagorydata} from "@/src/app/data/catagory"

export default function Home() {
  return (
    <div >
      <Hero />
      <LastNews />
      <Catagory data={Catagorydata} />
    </div>
  );
}
