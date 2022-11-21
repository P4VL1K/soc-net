import React from "react";
import {useFormik} from "formik";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";


export const Login = () => {

    const formik = useFormik({
        validate: () => {

        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
        }
    })

    return <form onSubmit={formik.handleSubmit}>
        <FormGroup>
            <TextField
                type="email"
                label="email"
                margin="normal"
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            <TextField
                type="password"
                label="password"
                margin="normal"
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <FormControlLabel
                label={'Remember me'}
                {...formik.getFieldProps('rememberMe')}
                control={<Checkbox
                    name='rememberMe'
                    onChange={formik.handleChange}
                    value={formik.values.rememberMe}
                />}
            />
            <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}>
                Login
            </Button>
        </FormGroup>
    </form>
}