import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {Preloader} from "../common/Preloader/Preloader";
import userPhoto from './ushastiy-kot.jpg'
import {ResponseProfileData} from "../store/profile-reducer";
import {ProfileStatus} from "./ProfileStatus";


export const ProfileInfo = React.memo(() => {

    const profile = useSelector<AppRootStateType, null | ResponseProfileData>(st => st.profile.profile)

    if (!profile) {
        return <Preloader/>
    }

    return <div>
        <ProfileStatus/>
        <div>{profile.fullName ? profile.fullName : 'fullName'}</div>
        <img src={profile.photos.large ? profile.photos.large : userPhoto} style={{width: '200px'}}/>
    </div>
})