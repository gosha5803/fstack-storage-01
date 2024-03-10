import { Box, Modal, Paper } from '@mui/material';
import React from 'react';

//Кастомное modal окно, которое оборачивает в модал Box и Paper из MUI.
interface ModalProps {
    children: React.ReactNode
    isOpen: boolean
}

const ModalFormCentered: React.FC<ModalProps> = ({children, isOpen}) => {
    return (
        <Modal
        open={isOpen}
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
                {children}
            </Paper>
            </Box>
        </Modal>
    );
};

export default ModalFormCentered;