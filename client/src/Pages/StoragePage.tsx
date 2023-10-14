import { Box, Breadcrumbs, Button, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FilesGreed from '../Components/FilesGreed';
import { useCreateFolderMutation, useLazyGetChildrenQuery } from '../api/filesApi';
import CreateFolderForm from '../interface/createFolderForm';
import { useTypedSelector } from '../hooks/useTypedSelector';
import CustomMenu from '../interface/CustomMenu';
import { CreateNewFolderOutlined, MoreHoriz } from '@mui/icons-material';
import { IFile } from '../Models/createFileRequest';
import { useActions } from '../hooks/useActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { changeParents } from '../store/files/filesSlice';

const StoragePage: React.FC = () => {
    const {addParent} = useActions()
    const navigate = useNavigate()
    const location = useLocation()
    const {id} = useTypedSelector(state => state.files.currentFile)
    const {parents} = useTypedSelector(state => state.files)
    const {setCurrentFile} = useActions()
    const [fetchChildFiles, {data: files}] = useLazyGetChildrenQuery()
    const [createFile, {data}] = useCreateFolderMutation()
    const [isContext, setIsContext] = useState<null | HTMLElement>(null)
    const [postition, setPosition] = useState<{left: number, top: number} | undefined>()
    const [showModal, setShowModal] = useState<boolean>(false)

    const openFolderHandler = (target: IFile) => {
        // if(parents.pop()?.id == target.id) {

        // }
        console.log(target)
        addParent(target)
        setCurrentFile(target)
        // navigate(`${target.id}`)
        fetchChildFiles(target.id)
    }

    console.log(location.pathname)

    useEffect(() => {
        fetchChildFiles(id)
    }, [])

    const createFileZamknutNaId = () => {
        // setShowModal(false)
        return function(name: string) {
            createFile({folderName: name, link: id})
        }
    }

    const navigateFiles = (file: IFile) => {
        changeParents(file.id)
        setCurrentFile(file)
        fetchChildFiles(file.id)
        console.log([1, 2, 3, 4].splice(3))
    }

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
                <CreateFolderForm
                existingFiles={files}
                isModalOpen={showModal}
                setIsModalOpen={setShowModal}
                createFile={createFileZamknutNaId()}/>
                <Breadcrumbs aria-label="breadcrumb" sx={{fontWeight: '700', color:'#27005D'}} >
                    <Typography color="text.primary">Хранилище</Typography>
                    {parents.map(file => 
                        <Button 
                        variant='text'
                        color='primary'
                        onClick={() => navigateFiles(file)}
                        >
                        {file.name}
                        </Button>
                        )}
                </Breadcrumbs>  
                <FilesGreed
                openFileHandler={openFolderHandler}
                files={files}
                />  
                {/* <MenuComponent
                id={id}
                visibility={isContext}
                createFile={createFile}
                /> */}
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