import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IFile } from "../store/files/types";
import { CreateFileRequest } from "../Models/createFileRequest";
import { setChildren } from "../store/files/filesSlice";

//Api для работы с системой папок и файлов хранилища
export const filesApi = createApi({
    reducerPath:'feiles/api',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:4080/api/folders'}),
    tagTypes: ['files'],
    endpoints: build => ({
        //Создаёт папку на сервере, принимает объект типа CreateFileRequest, описанный в папке models.
        createFolder: build.mutation<IFile, CreateFileRequest>({
            query: ({folderName, link}) => ({
                url: `create/${link}`,
                method: 'POST',
                body: {folderName}
            }),
            invalidatesTags: ['files'],
        }),

        //Endpoint для запроса дочерних папок, текущей папки от сервера.
        getChildren: build.query<IFile[], string>({
            query:(link: string) => ({
                url:`getChildren/${link}`
            }),
            providesTags: ['files'],
            async onQueryStarted(_arg, {queryFulfilled, dispatch}) {
                
                //После успешного ответа, также прямо из query диспатчится action setChildren, который задает дочерние папки стейту, чтобы отрисовать их в текущей папке.
                try {
                    const {data: children} = await queryFulfilled
                    dispatch(setChildren(children))
                } catch (e) {
                    console.log(e)
                }
            },
        })
    })
})

export const { useCreateFolderMutation, useLazyGetChildrenQuery } = filesApi
