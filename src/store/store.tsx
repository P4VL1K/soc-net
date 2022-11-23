import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import {UsersActionsType, usersReducer} from "./users-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import profileReducer, {ProfileActionsType} from "./profile-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";
import {DialogsActionsType, dialogsReducer} from "./dialogs-reducer";
import {AppActionsType, appReducer} from "./app-reducer";


const rootReducer = combineReducers({
        users: usersReducer,
        profile: profileReducer,
        dialogs: dialogsReducer,
        auth: authReducer,
        app: appReducer
    }
)

export const store = createStore(rootReducer, applyMiddleware(thunk))


//========================== TYPES ===============================

export type AppRootStateType = ReturnType<typeof rootReducer>
export type ActionsTypes = UsersActionsType | ProfileActionsType | AuthActionsType | DialogsActionsType | AppActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, any, Action>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsTypes>


//========================== HOOKS ===============================

export const useAppDispatch = () => useDispatch<AppDispatch>()

