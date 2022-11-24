import React from "react";
import {AddNewPostForm} from "./AddNewPostForm";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {PostType} from "../store/profile-reducer";



export const MyPosts = React.memo(() => {

    const posts = useSelector<AppRootStateType, Array<PostType>>(st => st.profile.posts)

    return <div>
        <AddNewPostForm/>
        {posts.map(p => <div key={p.id}>{p.message}</div>)}
    </div>
})