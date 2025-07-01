import Headr from "@/_Components/Header/Headr";
import Hero from "@/_Components/Hero/Hero";
import styles from "./page.module.css";
import LastNews from "@/_Components/LastNews/LastNews";

export default function Home() {
  return (
    <div className={styles.page}>
    <Headr/>
    <Hero/>
    <LastNews/>
    </div>
  );
}
