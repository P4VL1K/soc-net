import {Dispatch} from "redux";
import {setServerErrorAC} from "../store/auth-reducer";


export const handleServerError = (data: any, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setServerErrorAC(data.messages[0]))
    } else {
        dispatch(setServerErrorAC('some error occurred'))
    }
}