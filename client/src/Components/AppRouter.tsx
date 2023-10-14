import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes } from '../router';
import StoragePage from '../Pages/StoragePage';

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.authentication)
    const {currentFile} = useTypedSelector(state => state.files)

    return (
        <>
           {isAuth ? 
        <Routes>
            {privateRoutes.map(route => 
                <Route key={route.path} path={route.path} Component={route.element}/>
                )}
            {/* <Route path={`/storage/${currentFile.id}`} Component={StoragePage}/> */}
            {/* <Route path='*' element={<Navigate to={'/home'}/>}/> */}
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