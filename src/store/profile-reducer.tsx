import {Dispatch} from "redux";
import {profileAPI} from "../api/api";

type SetUserProfileActionType = {
    type: 'SET-USER-PROFILE'
    profile: null
}

type SetStatusActionType = {
    type: 'SET-STATUS'
    status: string
}

export type ProfileActionsType = SetUserProfileActionType | SetStatusActionType

type InitStateType = {
    profile: null | ResponseProfileData
    status: string
}

export type ResponseProfileData = {
    aboutMe: string
    fullName: string
    photos: {
        small: string
        large: string
    }
    userId: string
}

const initState: InitStateType = {
    profile: null,
    status: 'my status'
}

const profileReducer = (state = initState, action: ProfileActionsType) => {
    switch (action.type) {
        case "SET-USER-PROFILE":
            return {...state, profile: action.profile}
        case 'SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}


//================================= ACTIONS ==========================================

export const setUserProfile = (profile: null): SetUserProfileActionType => ({type: 'SET-USER-PROFILE', profile})
export const setStatus = (status: string): SetStatusActionType => ({type: 'SET-STATUS', status})


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

export default profileReducer