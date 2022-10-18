import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import {UsersActionsType, usersReducer} from "./users-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import profileReducer, {ProfileActionsType} from "./profile-reducer";
import {AuthActionsType, authReducer} from "./auth-reducer";


const rootReducer = combineReducers({
        users: usersReducer,
        profile: profileReducer,
        auth: authReducer
    }
)

//export type AppDispatch = typeof store.dispatch

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsTypes>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, Action>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

export type ActionsTypes = UsersActionsType | ProfileActionsType | AuthActionsType