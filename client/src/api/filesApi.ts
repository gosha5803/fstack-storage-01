import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IFile } from "../store/files/types";
import { CreateFileRequest } from "../Models/createFileRequest";
import { setChildren } from "../store/files/filesSlice";

export const filesApi = createApi({
    reducerPath:'feiles/api',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:4080/api/folders'}),
    tagTypes: ['files'],
    endpoints: build => ({
        createFolder: build.mutation<IFile, CreateFileRequest>({
            query: ({folderName, link}) => ({
                url: `create/${link}`,
                method: 'POST',
                body: {folderName}
            }),
            invalidatesTags: ['files'],
            
        }),
        getChildren: build.query<IFile[], string>({
            query:(link: string) => ({
                url:`getChildren/${link}`
            }),
            providesTags: ['files'],
            async onQueryStarted(_arg, {queryFulfilled, dispatch}) {
                const {data: children} = await queryFulfilled
                dispatch(setChildren(children))
            },
        })
    })
})

export const { useCreateFolderMutation, useLazyGetChildrenQuery } = filesApi
