import React, {useState} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {Preloader} from "../common/Preloader/Preloader";
import userPhoto from './kotik.jpg'
import {ResponseProfileData, saveProfile} from "../store/profile-reducer";
import {ProfileStatus} from "./ProfileStatus";
import {useParams} from "react-router-dom";
import {ProfileData} from "./ProfileData";
import {FormDataType, ProfileDataForm} from "./ProfileDataForm";
import s from './ProfileInfo.module.css'


export const ProfileInfo = React.memo(() => {

    const [editMode, setEditMode] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const toggle = useSelector<AppRootStateType, boolean>(st => st.profile['toggle'])
    const profile = useSelector<AppRootStateType, null | ResponseProfileData>(st => st.profile['profile'])
    //const profile = useSelector<AppRootStateType, null | ResponseProfileData>(st => st.profile.profile)

    let params = useParams()

    let userId = params['*']

    if (!profile) {
        return <Preloader/>
    }

    let isOwner = userId ? false : true

    const onSubmit = async (formData: FormDataType) => {
        await dispatch(saveProfile(formData))
        setEditMode(toggle)
    }

    return <div className={s.profileContainer}>
        <div className={s.mainProfile}>
            <img src={profile?.photos?.large ? profile.photos.large : userPhoto} style={{width: '200px'}} className={s.mainPhoto}/>
            <div className={s.status}>
                <span className={s.fullNameProfile}>{profile?.fullName ? profile.fullName : 'fullName'}</span>
                <ProfileStatus isOwner={isOwner}/>
            </div>
        </div>
        {editMode ? <ProfileDataForm onSubmit={onSubmit}/> : <ProfileData goToEditMode={() => setEditMode(true)}/>}
    </div>
})


export type ContactType = {
    contactTitle: string
    contactValue: null | string
}

export const Contact = (props: ContactType) => {
    return <div style={{marginLeft: '15px'}}><b>{props.contactTitle}: </b>{props.contactValue}</div>
}