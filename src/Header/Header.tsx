import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {useSelector} from "react-redux";
import {logout} from "../store/auth-reducer";


export const Header = () => {

    const dispatch = useAppDispatch()

    const login = useSelector<AppRootStateType, null | string>(st => st.auth.login)
    const isAuth = useSelector<AppRootStateType, boolean>(st => st.auth.isAuth)

    const onClickHandler = () => {
        dispatch(logout())
    }

    return <div className={s.headerContainer}>
        {
            isAuth
                ?
                <span>{login} - <button onClick={onClickHandler}>logout</button></span>
                :
                <NavLink to={'/login'}>Login</NavLink>
        }
    </div>
}