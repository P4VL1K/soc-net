import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {getStatusTC, getUserProfileTC} from "../store/profile-reducer";
import {useAppDispatch} from "../store/store";
import {ProfileInfo} from "./ProfileInfo";
import {MyPosts} from "./MyPosts";

export const Profile = React.memo(() => {

    const dispatch = useAppDispatch()

    let params = useParams()

    useEffect(() => {
        let userId = params['*']
        if (!userId) {
            userId = String(24541)
        }
        dispatch(getUserProfileTC(userId))
        dispatch(getStatusTC(userId))
    },[params])

    return <div>
        <ProfileInfo/>
        <MyPosts/>
    </div>
})