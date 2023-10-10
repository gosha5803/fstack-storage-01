import React, { FC, useEffect, useState } from 'react';
import LoginForm from '../Components/LoginForm';
import { registerApi } from '../api/authApi';
import AlertComponent from '../Components/Alert';
import { IBackenErrors } from '../Models/backendErrors';

const RegisterPage: FC = () => {
  

    return (
        <>
          <LoginForm
          />
          {/* <button onClick={() => {setAuth(true)}}>Говнно</button> */}
        </>
    );
};

export default RegisterPage;