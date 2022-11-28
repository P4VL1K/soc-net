import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {v1} from "uuid";
import {AppRootStateType, AppThunk} from "./store";
import {FormDataType} from "../Profile/ProfileDataForm";
import App from "../App";
import {logDOM} from "@testing-library/react";

type SetUserProfileActionType = {
    type: 'SET-USER-PROFILE'
    profile: null
}

type SetStatusActionType = {
    type: 'SET-STATUS'
    status: string
}

type SetNewPostActionType = {
    type: 'SET-POST'
    postMessage: string
}

type SavePhotoActionType = {
    type: 'SAVE-PHOTO'
    photos: PhotosType
}

export type ProfileActionsType =
    SetUserProfileActionType
    | SetStatusActionType
    | SetNewPostActionType
    | SavePhotoActionType

export type PostType = {
    id: string
    message: string
}

export type InitStateType = {
    profile: null | ResponseProfileData
    status: string
    posts: Array<PostType>
}

export type PhotosType = {
    large: string
    small: string
}

export type ContactsType = {
    facebook: null | string
    github: null | string
    instagram: null | string
    mainLink: null | string
    twitter: null | string
    vk: null | string
    website: null | string
    youtube: null | string
}

export type ResponseProfileData = {
    aboutMe: string
    fullName: string
    photos: PhotosType
    userId: string
    lookingForAJob: boolean
    contacts: ContactsType
    lookingForAJobDescription: string
}

const initState: InitStateType = {
    profile: null,
    status: 'my status',
    posts: [{id: v1(), message: 'Hello!'}]
}

const profileReducer = (state = initState, action: ProfileActionsType) => {
    switch (action.type) {
        case "SET-USER-PROFILE":
            return {...state, profile: action.profile}
        case 'SET-STATUS':
            return {...state, status: action.status}
        case 'SET-POST':
            return {...state, posts: [{id: v1(), message: action.postMessage}, ...state.posts]}
        case 'SAVE-PHOTO':
            return {...state, profile: {...state.profile, photos: action.photos}}
        default:
            return state
    }
}


//================================= ACTIONS ==========================================

export const setUserProfile = (profile: null): SetUserProfileActionType => ({type: 'SET-USER-PROFILE', profile})
export const setStatus = (status: string): SetStatusActionType => ({type: 'SET-STATUS', status})
export const setNewPost = (postMessage: string): SetNewPostActionType => ({type: 'SET-POST', postMessage})
export const savePhotoAC = (photos: PhotosType): SavePhotoActionType => ({type: 'SAVE-PHOTO', photos})


//================================= THUNK ==========================================

export const getUserProfileTC = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
        .then(res => {
            console.log(res.data)
            dispatch(setUserProfile(res.data))
        })
}

export const getStatusTC = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then(res => {
            dispatch(setStatus(res.data))
        })
}

export const updateStatusTC = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
}

export const savePhotoTC = (photo: any): AppThunk => async (dispatch) => {
    const response = await profileAPI.savePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoAC(response.data.data.photos))
    }
}

export const saveProfile = (formData: FormDataType): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    const userId = getState().auth.userId?.toString()
    const response = await profileAPI.saveProfile(formData)
    console.log(response)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileTC(userId as string))
    }
}

export default profileReducer