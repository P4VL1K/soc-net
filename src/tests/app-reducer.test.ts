import {appReducer, initializedSuccess} from "../store/app-reducer";


test('initialization should succeed', () => {
    const startState = {
        initialized: false
    }
    const action = initializedSuccess()

    const endState = appReducer(startState, action)

    expect(endState.initialized).toBe(true)
})