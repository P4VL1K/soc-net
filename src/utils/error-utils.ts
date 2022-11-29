import {Dispatch} from "redux";
import {setServerErrorAC} from "../store/auth-reducer";
import {setFormDataServerErrorAC} from "../store/profile-reducer";


export const handleServerError = (data: any, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setServerErrorAC(data.messages[0]))
    } else {
        dispatch(setServerErrorAC('some error occurred'))
    }
}

export const handleFormDataServerError = (data: any, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setFormDataServerErrorAC(data.messages[0]))
    } else {
        dispatch(setFormDataServerErrorAC('some error occurred'))
    }
}