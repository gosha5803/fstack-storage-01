import {setUser, logout} from './user/userSlice'
import {setAuth} from './auth/authSlice'

export const allActions = {
    setAuth,
    setUser,
    logout
}