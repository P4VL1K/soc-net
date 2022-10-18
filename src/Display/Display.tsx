import React from "react";
import s from './Display.module.css'
import {Route, Routes} from "react-router-dom";
import {Users} from "../Users/Users";
import {Profile} from "../Profile/Profile";
import {Login} from "../Login/Login";

export const  Display = () => {

    return <div className={s.displayContainer}>
        <Routes>
            <Route path={'/users'} element={<Users/>}/>
            <Route path={'/profile/:userId'} element={<Profile/>}/>
            <Route path={'login'} element={<Login/>}/>
        </Routes>
    </div>
}