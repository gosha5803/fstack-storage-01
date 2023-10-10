import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IUser, IUserInitial } from './types'

const initialState: IUserInitial = {
    user: {} as IUser
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        logout: (state: IUserInitial) => {
            localStorage.removeItem('accessToken')
            state.user = {} as IUser
        },
        setUser: (state: IUserInitial, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    }
}) 

export default userSlice.reducer
export const {setUser, logout} = userSlice.actions