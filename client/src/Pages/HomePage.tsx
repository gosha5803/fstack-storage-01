import React, { FC } from 'react';
import CustomForm from '../interface/ModalFormCentred';
import CustomMenu from '../interface/CustomMenu';
import { CreateNewFolder, HeadphonesBatteryOutlined, MoreHorizRounded } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';

const HomePage: FC = () => {
    return (
        <div>
            <Stack
            spacing={4}
            >
            <CustomMenu
            menuItems={[
                {title:'Тест с иконкой', icons: <CreateNewFolder/>, action() {
                    alert('Hello')
                },}
            ]}
            menuButton={{
                btnSettings:{
                    text: 'Тестовый текст',
                    color: 'warning',
                    variant: 'outlined'
                }
            }}
            />

            
                <CustomMenu
                menuItems={[
                    {title:'Тест с иконкой', icons: <CreateNewFolder/>, action() {
                        alert('Hello')
                    },}
                ]}
                menuButton={{
                    icon:<HeadphonesBatteryOutlined/>
                }}
                />
            </Stack>
        </div>
    );
};

export default HomePage;