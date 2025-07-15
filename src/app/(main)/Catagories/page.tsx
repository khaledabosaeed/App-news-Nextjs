import { Catagorydata } from "@/src/app/data/catagory"
import styles from "./Catagory.module.css"
import Catagory from "@/src/app/_Components/Catagory/Catagory"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Catagories",
  description: "Catagories"
}

function Page() {
  return (
    <div className={styles.Catagories}>
      <Catagory data={Catagorydata} />
    </div >
  )
}

export default Page