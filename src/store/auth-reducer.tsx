import {authAPI} from "../api/api";
import {Dispatch} from "redux";


export type AuthActionsType = SetAuthUserDataActionType

export type SetAuthUserDataActionType = {
    type: 'SET-AUTH-USER-DATA'
    data: {userId: number, email: string, login: string}
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
                isAuth: true
            }
        default:
            return state
    }
}

export const SetAuthUserData = (userId: number, email: string, login: string): SetAuthUserDataActionType => ({type: 'SET-AUTH-USER-DATA', data: {userId, email, login}})

export const GetAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                let {id, login, email} = res.data.data
                dispatch(SetAuthUserData(id, email, login))
            }
        })
}