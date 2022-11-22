import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppThunk} from "./store";
import App from "../App";

export type AuthActionsType = SetAuthUserDataActionType

export type SetAuthUserDataActionType = {
    type: 'SET-AUTH-USER-DATA'
    data: {userId: null | number, email: null | string, login: null | string}
    isAuth: boolean
}

type InitStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

const initState: InitStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state = initState, action: AuthActionsType): InitStateType => {
    switch (action.type) {
        case 'SET-AUTH-USER-DATA':
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId: null | number, email: null | string, login: null | string, isAuth: boolean): SetAuthUserDataActionType => ({type: 'SET-AUTH-USER-DATA', data: {userId, email, login}, isAuth})

export const getAuthUserData = (): AppThunk => (dispatch) => {
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                let {id, login, email} = res.data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
}

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
        })
}

export const logout = (): AppThunk => (dispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}