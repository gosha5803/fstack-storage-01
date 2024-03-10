import { setUser, logout } from './user/userSlice'
import { setAuth, login } from './auth/authSlice'
import { setChildren, setCurrentFile, addParent, changeParents } from './files/filesSlice'

//Перечеслине всех actions для их замыкания на диспетчер в useActions хуке.
export const allActions = {
    setAuth,
    setUser,
    logout,
    setChildren,
    setCurrentFile,
    addParent, 
    changeParents, 
    login    
}