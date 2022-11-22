import React from 'react'
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

export const Navbar = () => {

    return <div className={s.navbarContainer}>
        <NavLink to={'/profile'}>Profile</NavLink>
        <NavLink to={'/users'}>Users</NavLink>
        <NavLink to={'/dialogs'}>Dialogs</NavLink>
    </div>
}