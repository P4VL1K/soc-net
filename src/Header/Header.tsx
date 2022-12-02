import React from "react";
import s from './Header.module.css';
import {AppRootStateType, useAppDispatch} from "../store/store";
import {useSelector} from "react-redux";
import {logout} from "../store/auth-reducer";
import Button from "@mui/material/Button";
import userPhoto from "../Profile/kotik.jpg";
import {ResponseProfileData} from "../store/profile-reducer";
import {NavLink} from "react-router-dom";


export const Header = React.memo(() => {

    const dispatch = useAppDispatch()

    const login = useSelector<AppRootStateType, null | string>(st => st.auth.login)
    const isAuth = useSelector<AppRootStateType, boolean>(st => st.auth.isAuth)
    const fullName = useSelector<AppRootStateType, string | null>(st => st.profile['fullName'])
    const profile = useSelector<AppRootStateType, null | ResponseProfileData>(st => st.profile['profile'])

    const onClickHandler = () => {
        dispatch(logout())
    }

    return <div>
        {
            isAuth
            &&
            <div className={s.headerContainer}>
                <span className={s.leftHeader}>
                    <NavLink to={'/profile'}>
                        <img src={profile?.photos?.large ? profile.photos.large : userPhoto}
                             style={{width: '50px', borderRadius: '50%', marginLeft: '50px'}}/>
                    </NavLink>
                </span>
                <span className={s.fullName}>
                        {fullName ? fullName : 'full name'}
                    </span>
                <span>
                    <span className={s.logoutContainer}>
                        <span>{login} - </span>
                        <span>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={onClickHandler}>logout
                            </Button>
                        </span>
                        {/*<span><button >logout</button></span>*/}
                    </span>
                </span>
            </div>
        }
    </div>
})