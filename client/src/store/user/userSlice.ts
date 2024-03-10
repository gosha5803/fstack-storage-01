import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { IUser, IUserInitial } from './types'

//Слайс пользователя с экшенами.
const initialState: IUserInitial = {
    user: {} as IUser
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        //Экшен очищает аксесс токен из localStorage
        //И устанавливает пользователем в стейт пустой объект.
        logout: (state: IUserInitial) => {
            localStorage.removeItem('accessToken')
            state.user = {} as IUser
        },
        //Экшн устанавливает поьзлователя в стейт.
        setUser: (state: IUserInitial, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    }
}) 

export default userSlice.reducer
export const {setUser, logout} = userSlice.actions