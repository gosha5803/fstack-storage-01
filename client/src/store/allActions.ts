import {setUser, logout} from './user/userSlice'
import {setAuth} from './auth/authSlice'
import { setChildren, setCurrentFile, addParent, changeParents } from './files/filesSlice'

export const allActions = {
    setAuth,
    setUser,
    logout,
    setChildren,
    setCurrentFile,
    addParent, 
    changeParents    
}