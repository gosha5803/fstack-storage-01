import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userSliceReducer from '../store/user/userSlice'
import { registerApi } from '../api/authApi'
import authSliceReducer from './auth/authSlice'
import { filesApi } from '../api/filesApi'
import fileReducer from './files/filesSlice'

//Создание store и reducers. Три основных состояния пользователь, файлы и авторизация.
//Также два редбюсера для работы с RTK Query. Для работы с api папок и регистрации
const rootReducer = combineReducers({
    user: userSliceReducer,
    files: fileReducer,
    authentication: authSliceReducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(registerApi.middleware, filesApi.middleware)
})

//Получение типов стора и диспетчера
export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch