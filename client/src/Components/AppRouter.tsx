import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterPage from '../Pages/RegisterPage';
import HomePage from '../Pages/HomePage';
import { useTypedSelector } from '../hooks/useTypedSelector';
import StoragePage from '../Pages/StoragePage';

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.authentication)

    return (
        <>
           {!isAuth ? 
        <Routes>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='*' element={<Navigate to={'/register'}/>}/>
        </Routes>
        :
        <Routes>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/storage' element={<StoragePage/>}/>
            <Route path='*' element={<Navigate to={'/home'}/>}/>
        </Routes>
        } 
        </>
    );
};

export default AppRouter;