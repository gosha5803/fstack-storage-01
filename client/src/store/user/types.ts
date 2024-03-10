//Типизация состояния user.
export interface IUser {
    email: string,
    login: string,
    token: string,
    id: string
}

export interface IUserInitial {
    user: IUser
}