import { Navigate, Route, Routes } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes } from '../router';


//Компонент роутера приложения по флагу isAuth из стейта отрисовывает публичные или приватные пути. Также имеет функцию редиректа, с несуществующих и недоступных путей.
const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.authentication)

    return (
        <>
           {isAuth ? 
        <Routes>
            {privateRoutes.map(route => 
                <Route key={route.path} path={route.path} Component={route.element}/>
                )}
            <Route path='*' element={<Navigate to={'/storage'}/>}/>
        </Routes>
        :
        <Routes>
            {publicRoutes.map(route => 
                <Route key={route.path} path={route.path} Component={route.element}/>
                )}
            <Route path='*' element={<Navigate to={'/register'}/>}/>
        </Routes>
        } 
        </>
    );
};

export default AppRouter;