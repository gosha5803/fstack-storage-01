import { IFile } from "../store/files/types"

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
  