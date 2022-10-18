import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {Preloader} from "../common/Preloader/Preloader";
import userPhoto from './ushastiy-kot.jpg'
import {ResponseProfileData} from "../store/profile-reducer";


export const ProfileInfo = () => {

    const profile = useSelector<AppRootStateType, null | ResponseProfileData>(st => st.profile.profile)

    if (!profile) {
        return <Preloader/>
    }

    return <div>
        <div>{profile.fullName ? profile.fullName : 'fullName'}</div>
        <img src={profile.photos.large ? profile.photos.large : userPhoto}/>
    </div>
}