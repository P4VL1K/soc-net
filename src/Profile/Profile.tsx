import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {getUserProfileTC} from "../store/profile-reducer";
import {useAppDispatch} from "../store/store";
import {ProfileInfo} from "./ProfileInfo";

export const Profile = () => {

    const dispatch = useAppDispatch()

    let params = useParams()

    useEffect(() => {
        let userId = params.userId
        if (!userId) {
            userId = String(2)
        }
        dispatch(getUserProfileTC(userId))
    },[])

    return <div>
        <ProfileInfo/>
    </div>
}