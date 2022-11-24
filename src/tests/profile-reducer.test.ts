import {v1} from "uuid";
import profileReducer, {InitStateType, setNewPost} from "../store/profile-reducer";


test('new post text should be added', () => {
    const startState: InitStateType = {
        profile: null,
        status: 'my status',
        posts: [{id: v1(), message: 'Hello!'}]
    }
    const action = setNewPost('new post text')

    const endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(2)
})