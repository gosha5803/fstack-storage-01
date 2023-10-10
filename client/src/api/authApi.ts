import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './custom/customBaseQuery'
import { IAuthResponse } from '../Models/authResponse'
import { FormProps } from '../Components/LoginForm'
import {setUser} from '../store/user/userSlice'
import { setAuth } from '../store/auth/authSlice'

export const registerApi = createApi({
    reducerPath:'auth',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4080/api',
        credentials: 'include',
        prepareHeaders:(headers, { getState }) => {
            console.log(getState())
            return headers
        }
    }),
    endpoints: build => ({
        register: build.mutation<IAuthResponse, FormProps>({
            query: (formData: FormProps) => ({
                method: 'POST',
                url:'/register',
                body:formData
            }),
            async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
                try {
                    const {data: user} = await queryFulfilled
                    dispatch(setUser({token: user.accessToken, id: user.user.id, email: user.user.email, login: 'login'}))
                    dispatch(setAuth(true))
                    localStorage.setItem('accessToken', user.accessToken)
                } catch (e) {
                    console.log(e)
                }
            },
        }),

        checkRegister: build.query<IAuthResponse, void>({
            query: () => ({
                url: '/refresh',
            }),
            async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
                try {
                    const {data: user} = await queryFulfilled
                    dispatch(setUser({token: user.accessToken, id: user.user.id, email: user.user.email, login: 'login'}))
                    dispatch(setAuth(true))
                    localStorage.setItem('accessToken', user.accessToken)
                } catch (e) {
                    console.log(e)
                }
            },
        })
    })
}) 