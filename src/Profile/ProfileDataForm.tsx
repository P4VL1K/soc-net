import React, {ChangeEvent} from "react";
import {useFormik} from "formik";
import {Button} from "@mui/material";
import {Contact} from "./ProfileInfo";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {ResponseProfileData} from "../store/profile-reducer";
import {log} from "util";

export type FormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    // contacts: string
}

type ProfileDataFormPropsType = {
    onSubmit: (formData: FormDataType) => void
}

export const ProfileDataForm = (props: ProfileDataFormPropsType) => {

    const profile = useSelector<AppRootStateType, null | ResponseProfileData>(st => st.profile['profile'])

    const formik = useFormik({
        initialValues: {
            fullName: '',
            lookingForAJob: false,
            lookingForAJobDescription: '',
            aboutMe: '',
            contacts: {
                facebook: '',
                github: '',
                instagram: '',
                mainLink: '',
                twitter: '',
                vk: '',
                website: '',
                youtube: ''
            }
        },
        onSubmit: values => {
            props.onSubmit(values)
        }
    })

    return <form onSubmit={formik.handleSubmit}>
        <div><b>About me: </b></div>
        <div>
            <input
                type="text"
                name="aboutMe"
                onChange={formik.handleChange}
                value={formik.values.aboutMe}
            />
        </div>
        <div><b>Full name: </b></div>
        <div>
            <input
                type="text"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
            />
        </div>
        <div>
            <div><b>Looking for a job description: </b></div>
            <input
                type="text"
                name="lookingForAJobDescription"
                onChange={formik.handleChange}
                value={formik.values.lookingForAJobDescription}
            />
            <div><b>Looking for a job: </b></div>
            <input
                type="checkbox"
                name="lookingForAJob"
                onChange={formik.handleChange}
                checked={formik.values.lookingForAJob}/>
            <div><b>Contacts: </b>{Object.entries(profile?.contacts ? profile.contacts : 'contacts').map(([key, value]) => {
                 return <div key={key}><b>{key}: </b><Input name={key} onChange={formik.handleChange} placeholder={key} value={formik.values.contacts[key as keyof typeof formik.values.contacts]}/></div>
            })}</div>
            <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
            >
                submit
            </Button>
        </div>
    </form>
}

type InputPropsType = {
    name: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    placeholder: string
}

const Input = ({name, onChange, value, placeholder}: InputPropsType) => {

    return <div>
        <input
            type="text"
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
        />
    </div>
}