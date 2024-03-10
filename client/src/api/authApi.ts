import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAuthResponse } from '../Models/authResponse'
import { FormProps } from '../Components/LoginForm'
import { logout, setUser } from '../store/user/userSlice'
import { setAuth } from '../store/auth/authSlice'
import { IBackenErrors } from '../Models/backendErrors'
import { setCurrentFile } from '../store/files/filesSlice'


// Настройка api для запросов по документации RTK Query
export const registerApi = createApi({
    reducerPath:'auth',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4080/api',
        credentials: 'include'
    }) as BaseQueryFn<string | FetchArgs, unknown, IBackenErrors, {}>,


    endpoints: build => ({
        // Эндпоинт для запроса на регистрацию
        register: build.mutation<IAuthResponse, FormProps>({
            query: (formData: FormProps) => ({
                method: 'POST',
                url:'/register',
                body:formData
            }),
            async onQueryStarted(_arg, {dispatch, queryFulfilled}) {
                // При успешной регистрации в диспатчим данные пользлователя в стейт через slice(Redux Toolkit), флаг auth устанавливаем в true. После чего AppRouter перенаправляет нас на приватные routes. Access Token сохраняем в LocalStorage, в дальнейшем планировалось отправлять в интерцеторами Header Authorization.
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

        // Эндпоинт для запроса на то акутален ли рефреш токен в куках браузера, credentials true. В случае успеха те же данные устанавливаем в стейт и в localStorage.
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
                    localStorage.setItem('userId', user.user.id)
                } catch (e) {
                    console.log(e)
                }
            },
        }),

        //Такой же запрос как register, только на другой endpoint.
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

        //Запрос на то, чтобы стереть refreshToken на Backend, также очищаем данные из состояния и localStorage.
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