import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {v1} from "uuid";
import {AppRootStateType, AppThunk} from "./store";
import {FormDataType} from "../Profile/ProfileDataForm";
import {handleFormDataServerError} from "../utils/error-utils";

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

type setFormDataServerErrorActionType = {
    type: 'SET-FORM-DATA-SERVER-ERROR'
    error: string
}

type toggleActionType = {
    type: 'SET-TOGGLE'
    toggle: boolean
}

type setFullNameActionType = {
    type: 'SET-FULL-NAME'
    fullName: string
}

type deletePostActionType = {
    type: 'DELETE-POST'
    postId: string
}

type setMyUserIdActionType = {
    type: 'SET-MY-USER-ID'
    myUserId: string
}

type setMyProfileActionType = {
    type: 'SET-MY-PROFILE'
    myProfile: null
}

export type ProfileActionsType =
    SetUserProfileActionType
    | SetStatusActionType
    | SetNewPostActionType
    | SavePhotoActionType
    | setFormDataServerErrorActionType
    | toggleActionType
    | setFullNameActionType
    | deletePostActionType
    | setMyUserIdActionType
    | setMyProfileActionType

export type PostType = {
    id: string
    message: string
}

export type InitStateType = {
    myUserId: null | string
    myProfile: null | ResponseProfileData
    profile: null | ResponseProfileData
    status: string
    posts: Array<PostType>
    error: string | null
    toggle: boolean
    fullName: null | string
}

export type PhotosType = {
    large: string
    small: string
} | null

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
    myUserId: null,
    myProfile: null,
    profile: null,
    status: 'my status',
    posts: [{id: v1(), message: 'Hello!'}],
    error: null,
    toggle: false,
    fullName: null
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
        case 'SET-FORM-DATA-SERVER-ERROR':
            return {...state, error: action.error}
        case 'SET-TOGGLE':
            return {...state, toggle: action.toggle}
        case 'SET-FULL-NAME':
            return {...state, fullName: action.fullName}
        case 'DELETE-POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        case 'SET-MY-USER-ID':
            return {...state, myUserId: action.myUserId}
        case "SET-MY-PROFILE":
            return {...state, myProfile: action.myProfile}
        default:
            return state
    }
}


//================================= ACTIONS ==========================================

export const setUserProfile = (profile: null): SetUserProfileActionType => ({type: 'SET-USER-PROFILE', profile})
export const setStatus = (status: string): SetStatusActionType => ({type: 'SET-STATUS', status})
export const setNewPost = (postMessage: string): SetNewPostActionType => ({type: 'SET-POST', postMessage})
export const savePhotoAC = (photos: PhotosType): SavePhotoActionType => ({type: 'SAVE-PHOTO', photos})
export const setFormDataServerErrorAC = (error: string): setFormDataServerErrorActionType => ({type: 'SET-FORM-DATA-SERVER-ERROR', error})
export const toggleAC = (toggle: boolean): toggleActionType => ({type: 'SET-TOGGLE', toggle})
export const setFullName = (fullName: string): setFullNameActionType => ({type: 'SET-FULL-NAME', fullName})
export const deletePost = (postId: string): deletePostActionType => ({type: 'DELETE-POST', postId})
export const setMyUserId = (myUserId: string): setMyUserIdActionType => ({type: 'SET-MY-USER-ID', myUserId})
export const setMyProfile = (myProfile: null): setMyProfileActionType => ({type: 'SET-MY-PROFILE', myProfile})


//================================= THUNK ==========================================

export const getUserProfileTC = (userId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    profileAPI.getProfile(userId)
        .then(res => {
            if (getState().profile['myUserId'] === res.data.userId) {
                dispatch(setUserProfile(res.data))
                dispatch(setFullName(res.data.fullName))
                dispatch(setMyProfile(res.data))
            }
            dispatch(setUserProfile(res.data))
            dispatch(setFullName(res.data.fullName))
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

export const savePhotoTC = (photo: any): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    const response = await profileAPI.savePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoAC(response.data.data.photos))
        console.log(response.data)
        dispatch(getUserProfileTC(getState().profile['myUserId']))
    }
}

export const saveProfile = (formData: FormDataType): AppThunk => async (dispatch, getState: () => AppRootStateType) => {
    const userId = getState().auth.userId?.toString()
    const response = await profileAPI.saveProfile(formData)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileTC(userId as string))
        dispatch(toggleAC(true))
    } else {
        handleFormDataServerError(response.data, dispatch)
        dispatch(toggleAC(false))
    }
}

export default profileReducer