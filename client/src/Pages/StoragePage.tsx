import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FilesGreed from '../Components/FilesGreed';
import { useCreateFolderMutation, useLazyGetChildrenQuery } from '../api/filesApi';
import CreateFolderForm from '../interface/СreateFolderForm';
import { useTypedSelector } from '../hooks/useTypedSelector';
import CustomMenu from '../interface/CustomMenu';
import { CreateNewFolderOutlined } from '@mui/icons-material';
import { IFile } from '../Models/createFileRequest';
import { useActions } from '../hooks/useActions';

//Страница облачного хранилища.

const StoragePage: React.FC = () => {
    //Экшены добавления родителей текущей папки и переопределения родителей.
    const {addParent, changeParents} = useActions()
    //id и name текущей папки.
    const {id, name} = useTypedSelector(state => state.files.currentFile)
    //Родители текущей папки для отрисовки Breadcrums - навигации между папками.
    const {parents} = useTypedSelector(state => state.files)
    //Экшен установления текущей папки, при даблклике на определённую папку.
    const {setCurrentFile} = useActions()
    //Функция запроса дочерних папок текущей папки у сервера.
    const [fetchChildFiles, {data: files}] = useLazyGetChildrenQuery()
    //Функция создания папки по запросу на сервер.
    const [createFile] = useCreateFolderMutation()
    //position и isContext - состояния для отрисовки menu по вызову контекстного меню.
    const [isContext, setIsContext] = useState<null | HTMLElement>(null)
    const [postition, setPosition] = useState<{left: number, top: number} | undefined>()
    //Состояние отрисовки модального окна с формой для создания папки.
    const [showModal, setShowModal] = useState<boolean>(false)

    //При отрисовке компонента у корневой папки пользователя запрашиваются дети для их отрисовки.
    useEffect(() => {
        console.log(id)
        fetchChildFiles(id)
        console.log(files)
    }, [])

    //При открытии папки, текущая папка добавляется в массив родителей, открываема папка устанавливается как текущая и после этого запрашиваются её дочерние папки от сервера.
    const openFolderHandler = (target: IFile) => {
        addParent({id, name})
        setCurrentFile(target)
        fetchChildFiles(target.id)
    }

    //Данная функция будет передана в модальное окно создания папки, но чтобы не тащить туда id текущей папки, внутренняя функция замыкается на него здесь.
    const createFileZamknutNaId = () => {
        return function(name: string) {
            setShowModal(false)
            createFile({folderName: name, link: id})
        }
    }

    //При нажатии на элемент Breadcrums текущим устанавливается файл соответствующий BreadCrums айтему. Вызывается функция, которая отчистит папки, не являющиеся родителями текцущей папке. Далее запрашиваются длети текущей папки.
    const goBack = (file: IFile) => {
            setCurrentFile(file)
            changeParents({id: file.id, parents})
            fetchChildFiles(file.id)
    }

    //Функция отрабатывает при вызове контекстного меню и устанавливает position кастомного Menu в соответствии c положение мыши. 
    const handleContext = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        if(postition){
            return
        }
        setPosition({left: event.clientX, top: event.clientY})
        setIsContext(event.currentTarget);
      };

    return (
        <Box
        >
            {/* <CreateFolderForm/> */}
            <Typography align='left' variant='h4' component='span' ml={1}>Storage</Typography>
            <Box
            bgcolor={'white'}
            color={'secondary'}
            height={1300}
            ml={4}
            p={2}
            sx={{borderRadius:'30px 0 0 0', position: 'relative', id:'target-box'}}
            onContextMenu={handleContext}
            onClick={() => setPosition(undefined)}
            >   
            {/* Форма создания папки, в неё передаются дочерние папки, чтобы нельзя было создать папки с олинаковыми именами.
                Флаги modalOpen и функция изменения этого флагаю
                Функция создания файла замкнутая на айди текущей папки, он необхолдим серверу для создания папки.
            */}
                <CreateFolderForm
                existingFiles={files}
                isModalOpen={showModal}
                setIsModalOpen={setShowModal}
                createFile={createFileZamknutNaId()}/>
                    {/* <IconButton
                    disabled={!parents.length}
                    onClick={() => goBack}
                    >
                        <ArrowBackIos
                        color={!!parents.length ? 'primary' : 'disabled'}
                        />
                    </IconButton> */}
                <Breadcrumbs aria-label="breadcrumb" sx={{fontWeight: '700', color:'#27005D'}} >
                    {parents.map((file, index) => 
                    // Breadcrums отрисовывает по массиву родителей кнопки, при нажатии на которые пользователь переходит на соответствующую папку.
                        <Button 
                        key={file.id}
                        variant='text'
                        color='primary'
                        disabled={file.id === id}
                        onClick={() => goBack(file)}
                        >
                            {!index ? 'Хранилище' : file.name}
                        </Button>
                        )} 
                </Breadcrumbs>  
                {/* Сетка папок, которая принимает в себя функцию открытия папки и массив текущих файлов для их отрисовки. */}
                <FilesGreed
                openFileHandler={openFolderHandler}
                files={files}
                />  
                {/* <MenuComponent
                id={id}
                visibility={isContext}
                createFile={createFile}
                /> */}
                {/* Кастомный меню компонент без кнопки, так как отрисовывается не у кнопки, а по позиции. */}
                <CustomMenu
                menuItems={[
                    {
                        title: 'Создать папку',
                        icons:<CreateNewFolderOutlined/>,
                        action:() => {setShowModal(true)}}
                ]}
                position={postition}
                // visibility={isContext}
                />
            </Box>    
        </Box>
    );
};

export default StoragePage;