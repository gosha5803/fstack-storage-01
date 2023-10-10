import React, { FC } from 'react';
import LoginForm from '../Components/LoginForm';
import { registerApi } from '../api/authApi';
import { useActions } from '../hooks/useActions';

const RegisterPage: FC = () => {
  const [register, {data}] = registerApi.useRegisterMutation()
  // const [test, {data: res}] = registerApi.useLazyTestQuery()

    return (
        <>
          Register Page  
          <LoginForm
          registerUser={register}
          />
          {/* <button onClick={() => {setAuth(true)}}>Говнно</button> */}
        </>
    );
};

export default RegisterPage;