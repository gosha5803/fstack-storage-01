import React, {useState, useEffect} from 'react';
import {Box, Stack, TextField, Paper, Modal, Button, Typography, InputAdornment, IconButton} from '@mui/material'
import { useForm } from 'react-hook-form';
import { Validators } from '../utils/validators';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import PasswordValidation from './PasswordValidation';
import {List, ListItem} from '@mui/material'
import {CheckCircleOutlineOutlined} from '@mui/icons-material'
import { registerApi } from '../api/authApi';
import AlertComponent from './Alert';
import { MyButton } from '../interface/UI/MyButton';

export interface FormProps {
    email:string,
    password:string,
    login?:string
}

// interface LoginFormProps {
//     registerUser: (data: FormProps) => void,
//     login: (data: FormProps) => void
// }

const LoginForm: React.FC  = () => {
    const [isRegistration, setIsRegistration] = useState<boolean>(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [registerUser, {error: registerError, isError: isRegisterError}] = registerApi.useRegisterMutation()
    const [login, {error: loginError, isError: isLoginError}] = registerApi.useLoginMutation()
    const form = useForm<FormProps>()
    const {register, formState, handleSubmit, getValues} = form
    const {errors} = formState

    const submitHandler = (data: FormProps) => {
        isRegistration ? registerUser(data) : login(data)
    }

    return (
        <>
        <AlertComponent
        message={
            isRegistration ? (registerError && ('data' in registerError) && isRegisterError ? registerError.data.message : '')
            :
            (loginError && ('data' in loginError) && isLoginError ? loginError.data.message : '') 
          }
        />
        <Modal
        open={!false}
        >
            <Box
            display='flex'
            mt={10}
            justifyContent={'center'}
            sx={{outline:'none'}}
            >
            <Paper
                sx={{
                    p:'10px',
                    width:'400px'
                }}
                variant='outlined'
                
                >
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Stack
                    direction='column' 
                    m={3}
                    spacing={2}
                    // divider={<Divider orientation='vertical' flexItem/>}
                    >
                        <Typography variant='h4'component='span'>{isRegistration ? 'Регистрация' : 'Вход'}</Typography>
                        {isRegistration && <TextField 
                        label='login' 
                        error={!!errors.login?.message}
                        helperText={errors.login?.message}
                        {...register('login', Validators.login)}
                        />}
                        <TextField 
                        label='email' 
                        error={!!errors.email?.message}
                        helperText={errors.email?.message}
                        {...register('email', Validators.email)}
                        />
                        <TextField 
                        label='password' 
                        type={isPasswordVisible ? 'password' : 'text'}
                        error={!!errors.password?.message}
                        helperText={errors.password?.message}
                        {...register('password', isRegistration ? Validators.password : {required: true})}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>
                                <IconButton
                                onClick={() => setIsPasswordVisible(prev => !prev)}
                                >
                                    {isPasswordVisible ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }}/>
                        

                        {(isRegistration && getValues().password) && <PasswordValidation message={errors.password?.message}/>} 
                        
                        <MyButton
                        type='submit'
                        variant='contained'
                        color='secondary'
                        >
                            {isRegistration ? 'Зарегистрироваться' : 'Войти'}
                        </MyButton>
                        
                        <Stack direction='row' spacing={2}>
                            <MyButton 
                            clickHandler={() => setIsRegistration(p => !p)}
                            disabled={!isRegistration}
                            variant='text'
                            color='primary'
                            >
                                Вход
                            </MyButton>
                            <MyButton 
                            clickHandler={() => setIsRegistration(p => !p)}
                            disabled={isRegistration}
                            variant='text'
                            color='primary'
                            >
                                Регистрация
                            </MyButton>
                            
                        </Stack>

                    </Stack>
                </form>
            </Paper>
            </Box>
        </Modal>
        </>
    );
};

export default LoginForm;