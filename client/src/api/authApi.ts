import {BaseQueryFn, FetchArgs, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './custom/customBaseQuery'
import { IAuthResponse } from '../Models/authResponse'
import { FormProps } from '../Components/LoginForm'
import {logout, setUser} from '../store/user/userSlice'
import { setAuth } from '../store/auth/authSlice'
import { IBackenErrors } from '../Models/backendErrors'
import { setCurrentFile } from '../store/files/filesSlice'

export const registerApi = createApi({
    reducerPath:'auth',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4080/api',
        credentials: 'include',
        prepareHeaders:(headers, { getState }) => {
            return headers
        }
    }) as BaseQueryFn<string | FetchArgs, unknown, IBackenErrors, {}> ,
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
                    dispatch(setUser({token: user.accessToken, id: user.user.id, email: user.user.email, login: user.user.login}))
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
                    dispatch(setUser({token: user.accessToken, id: user.user.id, email: user.user.email, login:  user.user.login}))
                    dispatch(setCurrentFile(user.mainFolder))
                    dispatch(setAuth(true))
                    localStorage.setItem('accessToken', user.accessToken)
                } catch (e) {
                    console.log(e)
                }
            },
        }),

        login: build.mutation<IAuthResponse, FormProps>({
            query: (formData: FormProps) => ({
                method: 'POST',
                url:'/login',
                body:formData
            }),
            async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
                try {
                    const {data: user} = await queryFulfilled
                    dispatch(setUser({token: user.accessToken, id: user.user.id, email: user.user.email, login:  user.user.login}))
                    dispatch(setAuth(true))
                    localStorage.setItem('accessToken', user.accessToken)
                } catch (e) {
                    console.log(e)
                }
            },
        }),

        logout: build.query<string, void>({
            query: () => ({
                url:'/logout'
            }),
            async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
                try {
                    const {data: user} = await queryFulfilled
                    dispatch(logout())
                    dispatch(setAuth(false))
                    localStorage.removeItem('accessToken')
                } catch (e) {
                    console.log(e)
                }
            },
        }),
    })
}) 