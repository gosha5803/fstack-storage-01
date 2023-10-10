export interface IAuthResponse {
    accessToken: string
    refreshToken: string
    user: User
}

export interface User {
    email: string
    id: string
    login: string
}
  