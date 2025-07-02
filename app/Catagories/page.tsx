import { Catagorydata } from "@/data/catagory"
import styles from "./Catagory.module.css"
import Catagory from "@/_Components/Catagory/Catagory"

function Page() {
  return (
    <div className={styles.Catagories}>
          <Catagory data={Catagorydata} />
    </div >
  )
}

export default Page