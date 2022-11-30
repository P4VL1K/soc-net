import React, {ChangeEvent, useState} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {Preloader} from "../common/Preloader/Preloader";
import userPhoto from './ushastiy-kot.jpg'
import {ResponseProfileData, savePhotoTC, saveProfile} from "../store/profile-reducer";
import {ProfileStatus} from "./ProfileStatus";
import {useParams} from "react-router-dom";
import {ProfileData} from "./ProfileData";
import {FormDataType, ProfileDataForm} from "./ProfileDataForm";
import s from './ProfileInfo.module.css'
import {PhotoCamera} from "@mui/icons-material";
import {IconButton} from "@mui/material";


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

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            dispatch(savePhotoTC(e.target.files[0]))
        }
    }

    const onSubmit = async (formData: FormDataType) => {
        await dispatch(saveProfile(formData))
        setEditMode(toggle)
    }

    return <div>
        <ProfileStatus isOwner={isOwner}/>
        <img src={profile.photos.large ? profile.photos.large : userPhoto} style={{width: '200px'}} className={s.mainPhoto}/>
        {isOwner &&
            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={onMainPhotoSelected}/>
            <PhotoCamera />
            </IconButton>}
        {editMode ? <ProfileDataForm onSubmit={onSubmit}/> : <ProfileData goToEditMode={() => setEditMode(true)}/>}
    </div>
})


export type ContactType = {
    contactTitle: string
    contactValue: null | string
}

export const Contact = (props: ContactType) => {
    return <div><b>{props.contactTitle}: </b>{props.contactValue}</div>
}