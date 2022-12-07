import React, {ChangeEvent} from "react";
import {useFormik} from "formik";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {ResponseProfileData} from "../store/profile-reducer";
import s from './ProfileDataForm.module.css'

export type FormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}

type ProfileDataFormPropsType = {
    onSubmit: (formData: FormDataType) => void
}

type initialValuesType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    facebook: string
    github: string
    instagram: string
    mainLink: string
    twitter: string
    vk: string
    website: string
    youtube: string
}

export const ProfileDataForm = (props: ProfileDataFormPropsType) => {

    const profile = useSelector<AppRootStateType, null | ResponseProfileData>(st => st.profile['profile'])
    const error = useSelector<AppRootStateType, null | string>(st => st.profile['error'])

    const formik = useFormik({
        initialValues: {
            fullName: profile?.fullName ? profile.fullName : '',
            lookingForAJob: profile?.lookingForAJob ? profile.lookingForAJob : false,
            lookingForAJobDescription: profile?.lookingForAJobDescription ? profile.lookingForAJobDescription : '',
            aboutMe: profile?.aboutMe ? profile.aboutMe : '',
            facebook: profile?.contacts.facebook ? profile.contacts.facebook : '',
            github: profile?.contacts.github ? profile.contacts.github : '',
            instagram: profile?.contacts.instagram ? profile.contacts.instagram : '',
            mainLink: profile?.contacts.mainLink ? profile.contacts.mainLink : '',
            twitter: profile?.contacts.twitter ? profile.contacts.twitter : '',
            vk: profile?.contacts.vk ? profile.contacts.vk : '',
            website: profile?.contacts.website ? profile.contacts.website : '',
            youtube: profile?.contacts.youtube ? profile.contacts.youtube : ''
        },
        onSubmit: (values: initialValuesType) => {
            const formData = {
                fullName: values.fullName,
                lookingForAJob: values.lookingForAJob,
                lookingForAJobDescription: values.lookingForAJobDescription,
                aboutMe: values.aboutMe,
                contacts: {
                    facebook: values.facebook,
                    github: values.github,
                    instagram: values.instagram,
                    mainLink: values.mainLink,
                    twitter: values.twitter,
                    vk: values.vk,
                    website: values.website,
                    youtube: values.youtube
                }
            }
            props.onSubmit(formData)
        }
    })

    return <form onSubmit={formik.handleSubmit} style={{marginTop: '10px'}}>
        <div style={{color: 'red'}}>{error}</div>
        <div>
            <span><b>About me: </b></span>
            <input
                type="text"
                name="aboutMe"
                onChange={formik.handleChange}
                value={formik.values.aboutMe}
            />
        </div>
        <div>
            <span><b>Full name: </b></span>
            <input
                type="text"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
            />
        </div>
        <div>
            <div>
                <span><b>Looking for a job description: </b></span>
                <input
                    type="text"
                    name="lookingForAJobDescription"
                    onChange={formik.handleChange}
                    value={formik.values.lookingForAJobDescription}
                />
            </div>
            <div>
                <span><b>Looking for a job: </b></span>
                <input
                    type="checkbox"
                    name="lookingForAJob"
                    onChange={formik.handleChange}
                    checked={formik.values.lookingForAJob}/>
                <div>
                </div>
                <b>Contacts: </b>
                <div style={{paddingLeft: '20px'}} className={s.contacts}>
                    {Object.entries(profile?.contacts ? profile.contacts : 'contacts').map(([key, value]) => {
                        return <span key={key}><b>{key}: </b><Input
                            name={key}
                            onChange={formik.handleChange}
                            placeholder={key}
                            value={formik.values[key as keyof typeof formik.values]}/></span>
                    })}
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
                <Button
                    sx={{marginTop: '15px'}}
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                >
                    submit
                </Button>
            </div>
        </div>
    </form>
}

type InputPropsType = {
    name: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string | boolean
    placeholder: string
}

const Input = ({name, onChange, value, placeholder}: InputPropsType) => {

    if (typeof value !== "string") {
        return <div>
            error
        </div>
    }

    return <span>
        <input
            type="text"
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
        />
    </span>
}