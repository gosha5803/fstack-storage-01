//Типизация ошибок от сервера для их использования в RTK Query и в Alert.
export interface IBackenErrors {
    data: {
        message: string,
        errors: string[]
    },
    status: number
}