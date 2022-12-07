import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {getStatusTC, getUserProfileTC} from "../store/profile-reducer";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {ProfileInfo} from "./ProfileInfo";
import {useSelector} from "react-redux";

export const Profile = React.memo(() => {

    const myUserId = useSelector<AppRootStateType, null | number>(st => st.auth.userId)

    const dispatch = useAppDispatch()

    let params = useParams()

    useEffect(() => {
        let userId = params['*']
        if (!userId) {
            userId = String(myUserId)
        }
        dispatch(getUserProfileTC(userId))
        dispatch(getStatusTC(userId))
    },[params])

    return <div>
        <ProfileInfo/>
        {/*<MyPosts/>*/}
    </div>
})