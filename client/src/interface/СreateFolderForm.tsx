import { Button, IconButton, Stack, TextField } from '@mui/material';
import React from 'react';
import ModalFormCentered from './ModalFormCentred';
import { useForm } from 'react-hook-form';
import { CancelOutlined } from '@mui/icons-material';
import { Validators } from '../utils/validators';
import { IFile } from '../store/files/types';

//Форма для создания папки в хранилище. 

//Для ReactHookForms типизируем поле название папки: string.
interface FormProps {
    folderName: string
}

//Параметры, которые форма в себя принимает извне. 
//createFile - создать файл/папку - функция, отправляет запрос на создание папки на сервер.
//isModalOpen - флаг по которому отрисовывается данная форма в модальном окне.
//setIsModalOpen - переключение флага видимости
//ExistingFiles - сущестующие папки, чтобы не повторялось название папки. 
interface CreateFolderFormProps {
    createFile: (name: string) => void
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    existingFiles: IFile[] | undefined
}

const CreateFolderForm: React.FC<CreateFolderFormProps> = ({createFile, isModalOpen, setIsModalOpen, existingFiles}) => {
    //Работа с ReactHookForms
    const {register, handleSubmit, formState} = useForm<FormProps>()
    const {errors} = formState

    //При submitе формы вызывается функция содания папки и в неё передаётся имя папки.
    const submitHandler = (data: FormProps) => {
        createFile(data.folderName)
    } 
    
    return (
        //Кастомное модальное окно, открывающееся по свойству isOpen.
        <ModalFormCentered
        isOpen={isModalOpen}
        >
            <form
            onSubmit={handleSubmit(submitHandler)}
            >
                <Stack spacing={2} direction={'column'}>
                    <div
                    style={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                    >
                        <IconButton 
                        onClick={() => setIsModalOpen(false)}
                        sx={{
                            p:0
                            }}>
                            <CancelOutlined color='error'/>
                        </IconButton>
                    </div>
                    {/* Регистрация inputa по документации ReactHookForms и MUI.
                    Правила валидации находятся в папке utils/Validators
                    */}
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