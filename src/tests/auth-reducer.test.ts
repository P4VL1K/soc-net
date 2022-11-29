import {authReducer, InitStateType, setServerErrorAC} from "../store/auth-reducer";


test('errors should be saved', () => {
    const startState: InitStateType = {
        userId: null,
        email: null,
        login: null,
        isAuth: false,
        error: null,
        captchaURL: ''
    }
    const action = setServerErrorAC('ERROR')

    const endState = authReducer(startState, action)

    expect(endState.error).toBe('ERROR')
})