import Link from 'next/link'
import styles from './page.module.css'
import { Catagorydata } from '@/src/app/data/catagory'
function Sidebar() {
    const data = Catagorydata;
    return (
        <div>
            <div className={styles.sidebar}>
                <h1>Catagory</h1>
                {data.map((item, index) => {
                    return (
                        <Link key={index} href={"/news-list/" + item.title}>
                            {item.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Sidebar