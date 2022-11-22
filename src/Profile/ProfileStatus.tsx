import React, {ChangeEvent, useState} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {updateStatusTC} from "../store/profile-reducer";

export const ProfileStatus = () => {

    const dispatch = useAppDispatch()

    const status = useSelector<AppRootStateType, string>(st => st.profile.status)

    const [title, setTitle] = useState(status)
    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatusTC(title))
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <>
        {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{status || 'no status'}</span>
            </div>
        }
        {editMode &&
            <div>
                <input autoFocus value={title} onChange={onChangeInputHandler} onBlur={deactivateEditMode}/>
            </div>
        }
    </>
}