import { Box, Button, IconButton, InputAdornment, Modal, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

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