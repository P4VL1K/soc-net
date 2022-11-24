import {authAPI} from "../api/api";
import {AppThunk} from "./store";
import {handleServerError} from "../utils/error-utils";
import {initializedSuccess} from "./app-reducer";

export type AuthActionsType = SetAuthUserDataActionType | SetServerErrorActionType

export type SetAuthUserDataActionType = {
    type: 'SET-AUTH-USER-DATA'
    data: {userId: null | number, email: null | string, login: null | string}
    isAuth: boolean
}

export type SetServerErrorActionType = {
    type: 'SET-SERVER-ERROR'
    error: string
}

export type InitStateType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
    error: null | string
}

const initState: InitStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: null
}

export const authReducer = (state = initState, action: AuthActionsType): InitStateType => {
    switch (action.type) {
        case 'SET-AUTH-USER-DATA':
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }
        case 'SET-SERVER-ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}



//================================= ACTIONS ==========================================

export const setAuthUserData = (userId: null | number, email: null | string, login: null | string, isAuth: boolean): SetAuthUserDataActionType => ({type: 'SET-AUTH-USER-DATA', data: {userId, email, login}, isAuth})
export const setServerErrorAC = (error: string): SetServerErrorActionType => ({type: 'SET-SERVER-ERROR', error})


//================================= THUNK ==========================================

export const getAuthUserData = (): AppThunk => async (dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
        dispatch(initializedSuccess())
    }
}

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        handleServerError(response.data, dispatch)
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

// export const getAuthUserData = (): AppThunk => (dispatch) => {
//     authAPI.me()
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 let {id, login, email} = res.data.data
//                 dispatch(setAuthUserData(id, email, login, true))
//                 dispatch(initializedSuccess())
//             }
//         })
// }

// export const login = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch) => {
//     authAPI.login(email, password, rememberMe)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(getAuthUserData())
//             } else {
//                 handleServerError(res.data, dispatch)
//             }
//         })
// }

// export const logout = (): AppThunk => (dispatch) => {
//     authAPI.logout()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setAuthUserData(null, null, null, false))
//             }
//         })
// }