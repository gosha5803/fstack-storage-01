import React, { FC } from 'react';
import CustomForm from '../interface/ModalFormCentred';
import CustomMenu from '../interface/CustomMenu';
import { CreateNewFolder, HeadphonesBatteryOutlined, MoreHorizRounded } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';

const HomePage: FC = () => {
    const fetcher = async() => {
        const response = await fetch('http://localhost:4080/api/folders/downloadFile')
        const blob = await response.blob()

        const downloadURL = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadURL
        link.download = 'sasa'
        // document.appendChild(link)
        link.click()
        link.remove()
    }

    return (
        <div>
            <Stack
            spacing={4}
            >
            <CustomMenu
            menuItems={[
                {title:'Тест с иконкой', icons: <CreateNewFolder/>, action() {
                    fetcher()
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