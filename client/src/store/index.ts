import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userSliceReducer from '../store/user/userSlice'
import { registerApi } from '../api/authApi'
import { authSlice } from './auth/authSlice'

const rootReducer = combineReducers({
    user: userSliceReducer,
    authentication: authSlice.reducer,
    [registerApi.reducerPath]: registerApi.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(registerApi.middleware)
})

export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch