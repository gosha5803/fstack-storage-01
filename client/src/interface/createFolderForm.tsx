import { Box, Button, IconButton, Modal, Paper, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import ModalFormCentered from './ModalFormCentred';
import { useForm } from 'react-hook-form';
import { CreateFileRequest } from '../Models/createFileRequest';
import { CancelOutlined } from '@mui/icons-material';
import { Validators } from '../utils/validators';
import { IFile } from '../store/files/types';

interface FormProps {
    folderName: string
}

interface CreateFolderFormProps {
    createFile: (name: string) => void
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    existingFiles: IFile[] | undefined
}

const CreateFolderForm: React.FC<CreateFolderFormProps> = ({createFile, isModalOpen, setIsModalOpen, existingFiles}) => {
    // const [isModelOpen, setIsModelOpen] = useState<boolean>(false)
    const {register, handleSubmit, formState} = useForm<FormProps>()
    const {errors} = formState

    const submitHandler = (data: FormProps) => {
        createFile(data.folderName)
        setIsModalOpen(false)
    } 
    
    return (
        <ModalFormCentered
        isOpen={isModalOpen}
        >
            <form
            onSubmit={handleSubmit(submitHandler)}
            >
                <Stack spacing={2} direction={'column'}>
                    <IconButton 
                    onClick={() => setIsModalOpen(false)}
                    sx={{justifyContent:'end', p:0}}>
                        <CancelOutlined color='error'/>
                    </IconButton>
                    <TextField
                    label='Название папки'
                    placeholder='Новая папка'
                    variant='outlined'
                    error={!!errors.folderName?.message}
                    helperText={errors.folderName?.message}
                    {...register('folderName', Validators.createFolder(existingFiles))}
                    />
                    <Button 
                    type='submit'
                    color='primary'
                    variant='contained'
                    >
                    Создать папку
                    </Button> 
                </Stack>        
            </form>
        </ModalFormCentered>
        );
};

export default CreateFolderForm;