import styles from './page.module.css'
function Sidebar({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            <>
            <div className={styles.sidebar}></div>
            </>
            {children}
        </div>
    )
}

export default Sidebar