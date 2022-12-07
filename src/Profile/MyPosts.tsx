import React from "react";
import {AddNewPostForm} from "./AddNewPostForm";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {deletePost, PostType} from "../store/profile-reducer";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import s from './MyPosts.module.css'

type MyPostsPropsType = {
    isOwner: boolean
}

export const MyPosts = React.memo((props: MyPostsPropsType) => {

    const dispatch = useAppDispatch()

    const posts = useSelector<AppRootStateType, Array<PostType>>(st => st.profile['posts'])
    //const posts = useSelector<AppRootStateType, Array<PostType>>(st => st.profile.posts)

    const onClickDeleteHandler = (postId: string) => {
        dispatch(deletePost(postId))
    }

    return (
        props.isOwner ? <div>
            <hr/>
            <AddNewPostForm/>
            {posts.map(p =>
                <div key={p.id} style={{marginTop: '20px'}} className={s.postMessage}>
                    <div>{p.message}</div>
                    <div>
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                            onClick={() => onClickDeleteHandler(p.id)}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </div>
            )}
        </div> : null
    )
})