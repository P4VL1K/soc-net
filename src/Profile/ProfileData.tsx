import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {ResponseProfileData} from "../store/profile-reducer";
import React from "react";
import {Contact} from "./ProfileInfo";

type ProfileDataPropsType = {
    goToEditMode: () => void
}

export const ProfileData = (props: ProfileDataPropsType) => {

    const profile = useSelector<AppRootStateType, null | ResponseProfileData>(st => st.profile['profile'])

    return <div>
        <div><button onClick={props.goToEditMode}>edit</button></div>
        <div><b>About me: </b>{profile?.aboutMe ? profile.aboutMe : 'about me'}</div>
        <div><b>Full name: </b>{profile?.fullName ? profile.fullName : 'fullName'}</div>
        <div><b>Looking for a job description: </b>{profile?.lookingForAJobDescription ? profile.lookingForAJobDescription : 'fullName'}</div>
        <div><b>looking for a job: </b>{profile?.lookingForAJob ? 'yes' : 'no'}</div>
        <div><b>Contacts: </b>{Object.entries(profile?.contacts ? profile.contacts : 'contacts').map(([key, value]) => {
            return <Contact key={key} contactTitle={key} contactValue={value}/>
        })}</div>
    </div>
}
