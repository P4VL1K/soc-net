import {usersAPI} from "../api/api";
import {AppThunk} from "./store";

export type UsersActionsType = SetUsersActionType | ToggleIsFetchingActionType | setCurrentPageActionType | setTotalUsersCountActionType | followSuccessActionType | unfollowSuccessActionType | toggleFollowingProgressActionType

export type UserPropsType = {
    name: number
    id: number
    uniqueUrlName: string
    photos: PhotosType
    status: string
    followed: boolean
}

type PhotosType = {
    small: string
    large: string
}

type InitialStateType = {
    users: Array<UserPropsType>
    pageSize: number
    currentPage: number
    totalUsersCount: number
    isFetching: boolean
    followingInProgress: number[]
    portionSize: number
}

type SetUsersActionType = {
    type: 'SET-USERS'
    users: Array<UserPropsType>
}

type ToggleIsFetchingActionType = {
    type: 'TOGGLE-IS-FETCHING'
    isFetching: boolean
}

type setCurrentPageActionType = {
    type: 'SET-CURRENT-PAGE'
    currentPage: number
}

type setTotalUsersCountActionType = {
    type: 'SET-TOTAL-USERS-COUNT'
    totalCount: number
}

type followSuccessActionType = {
    type: 'FOLLOW'
    userId: number
}

type unfollowSuccessActionType = {
    type: 'UNFOLLOW'
    userId: number
}

type toggleFollowingProgressActionType = {
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS'
    isFetching: boolean
    userId: number
}

let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    currentPage: 1,
    totalUsersCount: 12,
    isFetching: false,
    followingInProgress: [],
    portionSize: 10
}

export const usersReducer = (state = initialState, action: UsersActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-USERS':
            return {...state, users: action.users}
        case 'TOGGLE-IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET-TOTAL-USERS-COUNT':
            return {...state, totalUsersCount: action.totalCount}
        case 'FOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: true} : u)}
        case 'UNFOLLOW':
            return {...state, users: state.users.map(u => u.id === action.userId ? {...u, followed: false} : u)}
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}


//================================= ACTIONS ==========================================

export const setUsersAC = (users: Array<UserPropsType>): SetUsersActionType => ({type: 'SET-USERS', users})
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingActionType => ({type: 'TOGGLE-IS-FETCHING', isFetching})
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({type: 'SET-CURRENT-PAGE', currentPage})
export const setTotalUsersCount = (totalCount: number): setTotalUsersCountActionType => ({type: 'SET-TOTAL-USERS-COUNT', totalCount})
export const followSuccess = (userId: number): followSuccessActionType => ({type: 'FOLLOW', userId})
export const unfollowSuccess = (userId: number): unfollowSuccessActionType => ({type: 'UNFOLLOW', userId})
export const toggleFollowingProgress = (isFetching: boolean, userId: number): toggleFollowingProgressActionType => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId})


//================================= THUNK ==========================================

export const getUsersTC = (currentPage: number, pageSize: number): AppThunk => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    const response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUsersAC(response.items))
    dispatch(setCurrentPage(currentPage))
    dispatch(setTotalUsersCount(response.totalCount))
}

export const followTC = (userId: number): AppThunk => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    const response = await usersAPI.follow(userId)
    if (response.data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const unfollowTC = (userId: number): AppThunk => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    const response = await usersAPI.unfollow(userId)
    if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

// export const getUsersTC = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
//     dispatch(toggleIsFetchingAC(true))
//     usersAPI.getUsers(currentPage, pageSize)
//         .then(data => {
//             dispatch(toggleIsFetchingAC(false))
//             dispatch(setUsersAC(data.items))
//             dispatch(setCurrentPage(currentPage))
//             dispatch(setTotalUsersCount(data.totalCount))
//         })
// }

// export const followTC = (userId: number) => (dispatch: Dispatch) => {
//     dispatch(toggleFollowingProgress(true, userId))
//     usersAPI.follow(userId)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(followSuccess(userId))
//             }
//             dispatch(toggleFollowingProgress(false, userId))
//         })
// }

// export const unfollowTC = (userId: number) => (dispatch: Dispatch) => {
//     dispatch(toggleFollowingProgress(true, userId))
//     usersAPI.unfollow(userId)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(unfollowSuccess(userId))
//             }
//             dispatch(toggleFollowingProgress(false, userId))
//         })
// }