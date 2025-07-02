import Hero from "@/_Components/Hero/Hero";
import styles from "./page.module.css";
import LastNews from "@/_Components/LastNews/LastNews";
import Catagory from "@/_Components/Catagory/Catagory";
import {Catagorydata} from "@/data/catagory"

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <LastNews />
      <Catagory data={Catagorydata} />
    </div>
  );
}
