import React from "react";
import {useFormik} from "formik";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import s from './Login.module.css'
import {login} from "../store/auth-reducer";
import {AppRootStateType, useAppDispatch} from "../store/store";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

type FormikErrorsType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = React.memo(() => {

    const isAuth = useSelector<AppRootStateType, boolean>(st => st.auth.isAuth)
    const error = useSelector<AppRootStateType, string | null>(st => st.auth.error)
    const captchaURL = useSelector<AppRootStateType, string>(st => st.auth.captchaURL)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        },
        validate: values => {
            const errors: FormikErrorsType = {}

            if (!values.email) {
                errors.email = 'required'
            } else if (values.email.length > 20) {
                errors.email = 'email must be no more than 20 symbols'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'invalid email address'
            }

            if (!values.password) {
                errors.password = 'required'
            } else if (values.password.length < 3) {
                errors.password = 'password must contain at least 3 symbols'
            } else if (values.password.length > 20) {
                errors.password = 'password must contain no more than 20 symbols'
            }

            return errors
        },
        onSubmit: values => {
            dispatch(login(values.email, values.password, values.rememberMe, values.captcha))
        }
    })

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return <form onSubmit={formik.handleSubmit}>
        <FormGroup>
            <TextField
                error={formik.errors.email ? true : false}
                type="email"
                label="email"
                margin="normal"
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
            <TextField
                error={formik.errors.password ? true : false}
                type="password"
                label="password"
                margin="normal"
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
            <FormControlLabel
                label={'Remember me'}
                {...formik.getFieldProps('rememberMe')}
                control={<Checkbox
                    name='rememberMe'
                    onChange={formik.handleChange}
                    value={formik.values.rememberMe}
                />}
            />
            <div style={{color: 'red'}}>
                {error && error}
            </div>
            {captchaURL && <div>
                <div>
                    <img src={captchaURL} />
                </div>
                <div>
                    <input
                        type="text"
                        name="captcha"
                        onChange={formik.handleChange}
                        value={formik.values.captcha}
                    />
                </div>
            </div>}
            <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
            >
                Login
            </Button>
        </FormGroup>
    </form>
})