import HomePage from "../Pages/HomePage"
import RegisterPage from "../Pages/RegisterPage"
import StoragePage from "../Pages/StoragePage"

interface IRoute {
    path: string
    element: React.ComponentType
}

export enum RouterPaths {
    HOME_PAGE = '/home',
    REGISTER_PAGE = '/register',
    STORAGE_PAGE = '/storage',
    TEST_PAGE = '/test'
}

export const privateRoutes: IRoute[] = [
    {path: RouterPaths.STORAGE_PAGE, element: StoragePage},
    {path: RouterPaths.HOME_PAGE, element: HomePage}
]

export const publicRoutes: IRoute[] = [
    {path: RouterPaths.REGISTER_PAGE, element: RegisterPage},
    // {path: RouterPaths.TEST_PAGE, element: }
]