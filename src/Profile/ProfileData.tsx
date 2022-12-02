import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {ResponseProfileData, savePhotoTC} from "../store/profile-reducer";
import React, {ChangeEvent} from "react";
import {Contact} from "./ProfileInfo";
import Button from "@mui/material/Button";
import {PhotoCamera} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import s from './../Profile/ProfileInfo.module.css'

type ProfileDataPropsType = {
    goToEditMode: () => void
}

export const ProfileData = (props: ProfileDataPropsType) => {

    const dispatch = useAppDispatch()

    const profile = useSelector<AppRootStateType, null | ResponseProfileData>(st => st.profile['profile'])

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            dispatch(savePhotoTC(e.target.files[0]))
        }
    }

    return <div>
            <hr/>
            <div className={s.editButtons}>
                <IconButton color="primary" aria-label="upload picture" component="label" sx={{position: 'relative', right: '0px'}}>
                    <input hidden accept="image/*" type="file" onChange={onMainPhotoSelected}/>
                    <PhotoCamera />
                </IconButton>
                <Button onClick={props.goToEditMode} variant="contained" size="small">edit profile</Button>
            </div>
            <hr/>
        <div><b>About me: </b>{profile?.aboutMe ? profile.aboutMe : 'about me'}</div>
        <div><b>Full name: </b>{profile?.fullName ? profile.fullName : 'fullName'}</div>
        <div><b>Looking for a job description: </b>{profile?.lookingForAJobDescription ? profile.lookingForAJobDescription : 'fullName'}</div>
        <div><b>looking for a job: </b>{profile?.lookingForAJob ? 'yes' : 'no'}</div>
        <div><b>Contacts: </b>{Object.entries(profile?.contacts ? profile.contacts : 'contacts').map(([key, value]) => {
            return <Contact key={key} contactTitle={key} contactValue={value}/>
        })}</div>
    </div>
}
