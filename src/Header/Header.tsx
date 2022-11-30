import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {useSelector} from "react-redux";
import {logout} from "../store/auth-reducer";
import Button from "@mui/material/Button";


export const Header = React.memo(() => {

    const dispatch = useAppDispatch()

    const login = useSelector<AppRootStateType, null | string>(st => st.auth.login)
    const isAuth = useSelector<AppRootStateType, boolean>(st => st.auth.isAuth)
    const fullName = useSelector<AppRootStateType, string | null>(st => st.profile['fullName'])

    const onClickHandler = () => {
        dispatch(logout())
    }

    return <div>
        {
            isAuth
                &&
                <div className={s.headerContainer}>
                    <h1 className={s.fullName}>
                        {fullName ? fullName : 'full name'}
                    </h1>
                    <span>
                        <span className={s.logoutContainer}>
                            <span>{login} - </span>
                            <span><Button size="small" variant="contained" onClick={onClickHandler}>logout</Button></span>
                            {/*<span><button >logout</button></span>*/}
                        </span>
                    </span>
                </div>
        }
    </div>
})