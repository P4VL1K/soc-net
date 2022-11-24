import React from "react";
import {Button, FormGroup, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch} from "../store/store";
import {SetMessageAC} from "../store/dialogs-reducer";

type FormikErrorsType = {
    message?: string
}

export const AddMessageForm = React.memo(() => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        validate: values => {
            const errors: FormikErrorsType = {}

            if (!values.message) {
                errors.message = 'required'
            } else if (values.message.length > 50) {
                errors.message = 'message length must not exceed 50 symbols'
            }

            return errors
        },
        onSubmit: values => {
            dispatch(SetMessageAC(values.message))
        }
    })

    return <form onSubmit={formik.handleSubmit}>
    <FormGroup>
        <TextField
            error={formik.errors.message ? true : false}
            type="textarea"
            label="message"
            margin="normal"
            name="message"
            onChange={formik.handleChange}
            value={formik.values.message}
        />
        {formik.errors.message ? <div style={{color: 'red'}}>{formik.errors.message}</div> : null}
        <Button
            type={'submit'}
            variant={'contained'}
            color={'primary'}>
            send
        </Button>
    </FormGroup>
    </form>
})