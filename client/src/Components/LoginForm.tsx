import React, {useState} from 'react';
import {Box, Stack, TextField, Paper, Modal, Typography, InputAdornment, IconButton, Button} from '@mui/material'
import { useForm } from 'react-hook-form';
import { Validators } from '../utils/validators';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { registerApi } from '../api/authApi';
import AlertComponent from './Alert';
// import { MyButton } from '../interface/UI/MyButton';

//Интерфейс полей формы для ReactHookForms. Логин присутствует в форме только, если флаг регистрации true, при авторизации логин не требуется.
export interface FormProps {
    email:string,
    password:string,
    login?:string
}

const LoginForm: React.FC  = () => {
    const [isRegistration, setIsRegistration] = useState<boolean>(false)
    //Состояние процесса регистрации/авторизации в зависимости от него в форме пишеться 'войти' либо 'зарегистрироваться', плюс при регистрации добавляется поле login. Также в зависимости от флага, запрос с данными отпраляется на разные эндпоинты (register или login).
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    //Флаг по которому пароль в input становится видимым и невидимым.
    const [registerUser, {error: registerError, isError: isRegisterError}] = registerApi.useRegisterMutation()
    const [login, {error: loginError, isError: isLoginError}] = registerApi.useLoginMutation()
    //Методы authApi, для отправки запроса и обработки ошибок.
    const form = useForm<FormProps>()
    const {register, formState, handleSubmit} = form
    const {errors} = formState
    //React hook forms методы для регистраци, и submit формы.

    //При сабмите формы, в зависимости от того регистрация у нас или авторизация данные формы передаются в разные методы authApi.
    const submitHandler = (data: FormProps) => {
        isRegistration ? registerUser(data) : login(data)
    }

    return (
        <>
        {/* Кастомный Alert компонент для обработки ошибок регистрации и авторизации. */}
            <AlertComponent
            message={
                isRegistration ? (registerError && ('data' in registerError) && isRegisterError ? registerError.data.message : '')
                :
                (loginError && ('data' in loginError) && isLoginError ? loginError.data.message : '') 
            }
            />

            {/* Теги импортированиые из MUI все настроены по документации */}
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
                    >
                        {/*В зависимости от процесса, в заголовоке формы регистрация либо вход*/}
                        <Typography variant='h4'component='span'>{isRegistration ? 'Регистрация' : 'Вход'}</Typography>
                        
                        {isRegistration && 
                        <TextField 
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
                        type={isPasswordVisible ? 'text' : 'password'}
                        error={!!errors.password?.message}
                        helperText={errors.password?.message}
                        {...register('password', isRegistration ? Validators.password : {required: true})}
                        
                        // Иконка закрытого или открытого глаза, чтобы делать пароль невидимым и видимым. 
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>
                                <IconButton
                                onClick={() => setIsPasswordVisible(prev => !prev)}
                                >
                                    {isPasswordVisible ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }}/>
                        
                        
                        {/*
                        Чеклист требований к паролю, длина, необходимые заглавные символы и прочее.
                        {(isRegistration && getValues().password) && <PasswordValidation message={errors.password?.message}/>}  */}
                        
                        <Button
                        type='submit'
                        variant='contained'
                        color='secondary'
                        >
                            {isRegistration ? 'Зарегистрироваться' : 'Войти'}
                        </Button>
                        

                        {/* Кнопки для смены процесса с регистрации на вход и наоборот */}
                        <Stack direction='row' spacing={2}>
                            <Button 
                            onClick={() => setIsRegistration(p => !p)}
                            disabled={!isRegistration}
                            variant='text'
                            color='primary'
                            >
                                Вход
                            </Button>
                            <Button 
                            onClick={() => setIsRegistration(p => !p)}
                            disabled={isRegistration}
                            variant='text'
                            color='primary'
                            >
                                Регистрация
                            </Button>
                            
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