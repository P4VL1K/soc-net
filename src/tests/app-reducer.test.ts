import {appReducer, ButtonToggleType, initializedSuccess} from "../store/app-reducer";


test('initialization should succeed', () => {
    const startState = {
        initialized: false,
        buttonToggle: '' as ButtonToggleType
    }
    const action = initializedSuccess()

    const endState = appReducer(startState, action)

    expect(endState.initialized).toBe(true)
})