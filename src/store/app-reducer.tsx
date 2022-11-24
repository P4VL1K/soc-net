import {AppThunk} from "./store";
import {getAuthUserData} from "./auth-reducer";


export type AppActionsType = initializedSuccessActionType

type initializedSuccessActionType = {
    type: 'INITIALIZED_SUCCESS'
}

type StateType = {
    initialized: boolean
}

const initialState = {
    initialized: false
}

export const appReducer = (state: StateType = initialState, action: AppActionsType) => {
    switch(action.type) {
        case "INITIALIZED_SUCCESS":
            return {...state, initialized: true}
        default:
            return state
    }
}


//================================= ACTIONS ==========================================

export const initializedSuccess = (): initializedSuccessActionType => ({type: 'INITIALIZED_SUCCESS'})


//================================= THUNK ==========================================

export const initializeApp = (): AppThunk => (dispatch) => {
    dispatch(getAuthUserData())
}