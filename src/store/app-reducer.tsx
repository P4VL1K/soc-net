import {AppThunk} from "./store";
import {getAuthUserData} from "./auth-reducer";


export type AppActionsType = initializedSuccessActionType | setButtonToggleActionType

type initializedSuccessActionType = {
    type: 'INITIALIZED_SUCCESS'
}

type setButtonToggleActionType = {
    type: 'SET-BUTTON-TOGGLE'
    buttonToggle: ButtonToggleType
}

type StateType = {
    initialized: boolean
    buttonToggle: ButtonToggleType
}

export type ButtonToggleType = 'profile' | 'users' | 'dialogs' | ''

const initialState: StateType = {
    initialized: false,
    buttonToggle: ''
}

export const appReducer = (state = initialState, action: AppActionsType) => {
    switch(action.type) {
        case "INITIALIZED_SUCCESS":
            return {...state, initialized: true}
        case "SET-BUTTON-TOGGLE":
            return {...state, buttonToggle: action.buttonToggle}
        default:
            return state
    }
}


//================================= ACTIONS ==========================================

export const initializedSuccess = (): initializedSuccessActionType => ({type: 'INITIALIZED_SUCCESS'})
export const setButtonToggle = (buttonToggle: ButtonToggleType): setButtonToggleActionType => ({type: 'SET-BUTTON-TOGGLE', buttonToggle})


//================================= THUNK ==========================================

export const initializeApp = (): AppThunk => (dispatch) => {
    dispatch(getAuthUserData())
}