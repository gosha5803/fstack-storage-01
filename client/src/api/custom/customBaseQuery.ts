import {fetchBaseQuery} from '@reduxjs/toolkit/query/react'



export const customBaseQuery = async() => fetchBaseQuery({
    baseUrl:'http://localhost:4080/api',
    prepareHeaders:(headers, { getState }) => {
        return headers
    }
})