import {Dispatch} from "redux";
import {profileAPI} from "../api/api";

type SetUserProfile = {
    type: 'SET-USER-PROFILE'
    profile: null
}

export type ProfileActionsType = SetUserProfile

type InitStateType = {
    profile: null | ResponseProfileData
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
    profile: null
}

const profileReducer = (state = initState, action: ProfileActionsType) => {
    switch (action.type) {
        case "SET-USER-PROFILE":
            return {...state, profile: action.profile}
        default:
            return state
    }
}


//================================= ACTIONS ==========================================

export const setUserProfile = (profile: null): SetUserProfile => ({type: 'SET-USER-PROFILE', profile})


//================================= THUNK ==========================================

export const getUserProfileTC = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
        .then(res => {
            console.log(res.data)
            dispatch(setUserProfile(res.data))
        })
}

export default profileReducer