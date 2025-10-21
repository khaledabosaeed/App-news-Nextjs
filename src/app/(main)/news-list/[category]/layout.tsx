import React from 'react'
import Sidebar from './Sidbar'
import style from "./page.module.css"
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={style.mainContinar}>
            <Sidebar />
            <div >{children}</div>
        </div>
    );
}

