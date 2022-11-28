import axios from "axios";
import {UserPropsType} from "../store/users-reducer";
import {FormDataType} from "../Profile/ProfileDataForm";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd5adea60-9bd3-42bf-aef9-f6ec89a799fa'
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
    },
    getStatus (userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus (status: string) {
        return instance.put('/profile/status', {status})
    },
    savePhoto (photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile (profile: FormDataType) {
        return instance.put('profile', profile)
    }
}

export const authAPI = {
    me () {
        return instance.get('/auth/me')
    },
    login (email: string, password: string, rememberMe: boolean) {
        return instance.post('/auth/login', {email, password, rememberMe})
    },
    logout () {
        return instance.delete('/auth/login')
    }
}

type ResponseType = {
    items: Array<UserPropsType>
    totalCount: number
    error: null | string
}