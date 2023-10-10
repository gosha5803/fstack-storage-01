import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IAuth } from './types'
import { IBackenErrors } from '../../Models/backendErrors'

const initialState: IAuth = {
    isAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state: IAuth, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        }
    }
})

export const {setAuth} = authSlice.actions