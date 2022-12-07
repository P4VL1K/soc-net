import React from "react";
import {Button, FormGroup, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch} from "../store/store";
import {setNewPost} from "../store/profile-reducer";
import s from './../Profile/ProfileInfo.module.css'

type FormikErrorType = {
    post?: string
}

export const AddNewPostForm = React.memo(() => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            post: ''
        },
        validate: values => {
            const errors: FormikErrorType = {}

            if (!values.post) {
                errors.post = 'required'
            } else if (values.post.length > 300) {
                errors.post = 'post length must not exceed 300 symbols'
            }

            return errors
        },
        onSubmit: (values, actions) => {
            dispatch(setNewPost(values.post))
            actions.resetForm({
                values: {
                    post: ''
                }
            })
        }
    })

    return <form onSubmit={formik.handleSubmit}>
        <FormGroup className={s.post}>
            <TextField
                error={formik.errors.post ? true : false}
                type="textarea"
                label="post"
                margin="normal"
                name="post"
                onChange={formik.handleChange}
                value={formik.values.post}
            />
            {formik.errors.post ? <div style={{color: 'red'}}>{formik.errors.post}</div> : null}
            <Button
                size="large"
                type={'submit'}
                variant={'contained'}
                color={'primary'}>
                post
            </Button>
        </FormGroup>
    </form>
})