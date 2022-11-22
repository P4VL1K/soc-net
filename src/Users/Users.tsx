import React, {useEffect} from "react";
import s from './Users.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {followTC, getUsersTC, unfollowTC, UserPropsType} from "../store/users-reducer";
import {Preloader} from "../common/Preloader/Preloader";
import {Navigate, NavLink} from "react-router-dom";
import avatar from './post_5c8e624c5ee30.jpg'

export const Users = () => {

    const totalUsersCount = useSelector<AppRootStateType, number>(st => st.users.totalUsersCount)
    const pageSize = useSelector<AppRootStateType, number>(st => st.users.pageSize)
    const currentPage = useSelector<AppRootStateType, number>(st => st.users.currentPage)
    const isFetching = useSelector<AppRootStateType, boolean>(st => st.users.isFetching)
    const users = useSelector<AppRootStateType, Array<UserPropsType>>(st => st.users.users)
    const followingInProgress = useSelector<AppRootStateType, number[]>(st => st.users.followingInProgress)

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize))
    }, [])

    const onClickHandler = (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, pageSize))
    }

    return <div className={s.usersContainer}>
        {isFetching ? <Preloader/> : <div>
            {pages.map(p => <span
                key={p}
                className={currentPage === p ? s.selectedPage : ''}
                onClick={(e) => onClickHandler(p)}
            >{-p}</span>)}
        </div>}
        {users.map(u => <div key={u.id}>
            <NavLink to={`/profile/` + u.id}>
                <img src={u.photos.small ? u.photos.small : avatar} className={s.avatar}/>
            </NavLink>
            <div>
                {u.followed ?
                    <button onClick={() => dispatch(unfollowTC(u.id))} disabled={followingInProgress.some(id => id === u.id)}>
                        Unfollow
                    </button>
                    : <button onClick={() => dispatch(followTC(u.id))} disabled={followingInProgress.some(id => id === u.id)}>
                        Follow
                    </button>}
            </div>
            <div>
                Name: {u.name}
            </div>
        </div>)}
    </div>
}