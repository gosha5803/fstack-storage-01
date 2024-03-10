import { IFile } from "../store/files/types"

//Тип ответа от сервера с эндпоинтов auth.
export interface IAuthResponse {
    accessToken: string
    refreshToken: string
    user: User,
    mainFolder: IFile
}

export interface User {
    email: string
    id: string
    login: string
}
  