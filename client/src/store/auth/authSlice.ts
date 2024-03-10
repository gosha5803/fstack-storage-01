import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IAuth } from './types'

const initialState: IAuth = {
    isAuth: false,
    user: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //Экшн меняет флаг auth.
        setAuth: (state: IAuth, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        //Экшн устанавливает текущего пользователя.
        login: (state: IAuth, action: PayloadAction<string>) => {
            state.user = action.payload
        }
    }
})

export const { setAuth, login } = authSlice.actions
export default authSlice.reducer