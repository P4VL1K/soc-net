import {v1} from "uuid";

type SetMessageAC = {
    type: 'SET-MESSAGE'
    message: string
}

export type MessageType = {
    id: string
    message: string
}

export type StateType = {
    messages: Array<MessageType>
}

export type DialogsActionsType = SetMessageAC

const initialState: StateType = {
    messages: [{id: v1(), message: ''}]
}

export const dialogsReducer = (state = initialState, action: DialogsActionsType): StateType => {
    switch (action.type) {
        case 'SET-MESSAGE':
            return {...state, messages: [...state.messages, {id: v1(), message: action.message}]}
        default:
            return state
    }
}

export const SetMessageAC = (message: string): SetMessageAC => ({type: 'SET-MESSAGE', message})