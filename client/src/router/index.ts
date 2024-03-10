import HomePage from "../Pages/HomePage"
import RegisterPage from "../Pages/RegisterPage"
import StoragePage from "../Pages/StoragePage"

//Интерфейс Route
interface IRoute {
    path: string
    element: React.ComponentType
}

//Перечисление существующих путей
export enum RouterPaths {
    HOME_PAGE = '/home',
    REGISTER_PAGE = '/register',
    STORAGE_PAGE = '/storage'
}

//Приватные пути
export const privateRoutes: IRoute[] = [
    {path: RouterPaths.STORAGE_PAGE, element: StoragePage},
    {path: RouterPaths.HOME_PAGE, element: HomePage}
]

//Публичные пути
export const publicRoutes: IRoute[] = [
    {path: RouterPaths.REGISTER_PAGE, element: RegisterPage},
]