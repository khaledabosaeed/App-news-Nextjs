import { Catagorydata } from "@/src/app/data/catagory"
import styles from "./Catagory.module.css"
import Catagory from "@/src/app/_Components/Catagory/Catagory"

function Page() {
  return (
    <div className={styles.Catagories}>
          <Catagory data={Catagorydata} />
    </div >
  )
}

export default Page