import React, {useEffect, useState} from "react";
import s from './Users.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {followTC, getUsersTC, unfollowTC, UserPropsType} from "../store/users-reducer";
import {Preloader} from "../common/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import avatar from './post_5c8e624c5ee30.jpg';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';

export const Users = React.memo(() => {

    const totalUsersCount = useSelector<AppRootStateType, number>(st => st.users.totalUsersCount)
    const pageSize = useSelector<AppRootStateType, number>(st => st.users.pageSize)
    const currentPage = useSelector<AppRootStateType, number>(st => st.users.currentPage)
    const isFetching = useSelector<AppRootStateType, boolean>(st => st.users.isFetching)
    const users = useSelector<AppRootStateType, Array<UserPropsType>>(st => st.users.users)
    const followingInProgress = useSelector<AppRootStateType, number[]>(st => st.users.followingInProgress)
    const portionSize = useSelector<AppRootStateType, number>(st => st.users.portionSize)

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize))
    }, [])

    const onClickHandler = (pageNumber: number) => {
        dispatch(getUsersTC(pageNumber, pageSize))
    }

    return <div className={s.usersContainer}>
        {isFetching ? <Preloader/> : <div>
            {portionNumber > 1  &&
                <FirstPageIcon onClick={() => setPortionNumber(portionNumber - 1)}>PREV</FirstPageIcon>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => <span
                key={p}
                className={currentPage === p ? s.selectedPage : ''}
                onClick={(e) => onClickHandler(p)}
            >{-p}</span>)}
            {portionCount > portionNumber &&
                <LastPageIcon onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</LastPageIcon>
            }
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
})