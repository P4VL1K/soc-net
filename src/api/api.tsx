import axios from "axios";
import {UserPropsType} from "../store/users-reducer";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c89dcbe5-0368-482a-9300-ed145f7cdf2f'
    }
})

export const usersAPI = {
    getUsers (currentPage: number, pageSize: number) {
        return instance.get<ResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    follow (userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow (userId: number) {
        return instance.delete(`follow/${userId}`)
    }
}

export const profileAPI = {
    getProfile (userId: string) {
        return instance.get('profile/' + userId)
    }
}

export const authAPI = {
    me () {
        return instance.get('/auth/me')
    }
}




type ResponseType = {
    items: Array<UserPropsType>
    totalCount: number
    error: null | string
}