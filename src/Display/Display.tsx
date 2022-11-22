import React from "react";
import s from './Display.module.css'
import {Route, Routes} from "react-router-dom";
import {Users} from "../Users/Users";
import {Profile} from "../Profile/Profile";
import {Login} from "../Login/Login";
import {Dialogs} from "../Dialogs/Dialogs";

export const  Display = () => {

    return <div className={s.displayContainer}>
        <Routes>
            <Route path={'/users'} element={<Users/>}/>
            <Route path={'/profile/*'} element={<Profile/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/dialogs'} element={<Dialogs/>}/>
        </Routes>
    </div>
}