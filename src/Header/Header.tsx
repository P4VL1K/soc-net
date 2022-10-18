import React, {useEffect} from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {authAPI} from "../api/api";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {GetAuthUserData, SetAuthUserData} from "../store/auth-reducer";
import {useSelector} from "react-redux";


export const Header = () => {

    const dispatch = useAppDispatch()

    const login = useSelector<AppRootStateType, null | string>(st => st.auth.login)
    const isAuth = useSelector<AppRootStateType, boolean>(st => st.auth.isAuth)

    useEffect(() => {
        dispatch(GetAuthUserData())
    }, [])

    return <div className={s.headerContainer}>
            {isAuth ? login : <NavLink to={'/login'}>Login</NavLink>}
    </div>
}