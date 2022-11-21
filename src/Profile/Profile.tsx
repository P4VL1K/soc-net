import React, {useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";
import {getStatusTC, getUserProfileTC} from "../store/profile-reducer";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {ProfileInfo} from "./ProfileInfo";
import {useSelector} from "react-redux";

export const Profile = () => {

    const isAuth = useSelector<AppRootStateType, boolean>(st => st.auth.isAuth)

    const dispatch = useAppDispatch()

    let params = useParams()

    useEffect(() => {
        let userId = params['*']
        if (!userId) {
            userId = String(24541)
        }
        dispatch(getUserProfileTC(userId))
        dispatch(getStatusTC(userId))
    },[])

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }

    return <div>
        <ProfileInfo/>
    </div>
}