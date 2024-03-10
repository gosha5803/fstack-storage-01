import React, { FC, useEffect } from 'react';
import {Stack, List, ListItem} from '@mui/material'
import {CheckCircleOutlineOutlined} from '@mui/icons-material'

//Недоработанный компонент.!!!!!!!!!!!!!!
interface PasswordValidationProps {
    message: string | undefined
}

const PasswordValidation: FC<PasswordValidationProps> = ({message}) => {

    return (
        <Stack>
            <List>
                
                <ListItem
                sx={{
                    color:`${
                        message == 'Хотябы одна заглавная буква' ? 
                        'error.dark' : 
                        'success.dark' 
                        }`
                }}
                >
                    <CheckCircleOutlineOutlined/>
                    Заглавная бука
                </ListItem>

                <ListItem
                sx={{
                    color:`${
                        message == 'Хотябы одна строчная буква' ? 
                        'error.dark' : 
                        'success.dark' 
                        }`
                }}
                >
                    <CheckCircleOutlineOutlined/>
                    Строчная буква
                </ListItem>

                <ListItem
                sx={{
                    color:`${
                        message == 'Хотябы одна цифра' ? 
                        'error.dark' : 
                        'success.dark' 
                        }`
                }}
                >
                    <CheckCircleOutlineOutlined/>
                    Цифра
                </ListItem>

                <ListItem
                sx={{
                    color:`${
                        message == 'Минимальная длина 8 символов' ? 
                        'error.dark' : 
                        'success.dark' 
                        }`
                }}
                >
                    <CheckCircleOutlineOutlined/>
                    Длина не менее 8 символов
                </ListItem>
            </List>
        </Stack>
    );
};

export default PasswordValidation;