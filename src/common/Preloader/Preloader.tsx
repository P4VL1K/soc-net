import React from "react";
import preloader from './preloader.gif'
import s from './Preloader.module.css'

export const Preloader = () => {

    return <div className={s.preloader}>
        <img src={preloader} />
    </div>
}