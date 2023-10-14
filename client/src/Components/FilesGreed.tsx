import { FolderSpecialOutlined, FolderSharp } from '@mui/icons-material';
import { Box, Grid, Typography, styled } from '@mui/material';
import React from 'react';
import { IFile } from '../store/files/types';
import UploadFileComponent from './UploadFileComponent';

// const Div = styled('span')(({ theme }) => ({
//     ...theme.typography.button,
//       }));

interface FileGridProps {
    files: IFile[] | undefined
    openFileHandler: (target: IFile) => void
}

const FilesGreed: React.FC<FileGridProps> = ({files, openFileHandler}) => {
    const clicker = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e.detail)
    }
    return (
        <Grid container spacing={2} mt={3} >
            {files && files.map(file => 
                <Grid 
                key={file.id}
                item 
                xs={2} 
                display={'flex'} 
                justifyContent={'center'} 
                alignItems={'center'}>
                    <Box 
                    // onClick={clicker}
                    onDoubleClick={() => openFileHandler(file)} 
                    sx={{
                        width:'120px',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        transition:'.3s',
                    ':hover': {
                        bgcolor: 'rgb(187, 192, 197)',
                        cursor:'pointer',
                        borderRadius: '10px'
                    
                    }
                        }}
                        >
                        <FolderSharp color='info' sx={{fontSize:100}}/>
                        <Typography align='center' component={'span'} >{file.name}</Typography>
                    </Box>
                </Grid>
            )}
            <Grid 
                item 
                xs={2} 
                display={'flex'} 
                justifyContent={'center'} 
                alignItems={'center'}>
                    <Box sx={{
                        width:'60px',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        transition:'.3s',
                        ':hover': {
                        bgcolor: 'rgb(187, 192, 197)',
                        cursor:'pointer',
                        borderRadius: '50%'
                    
                    }
                        }}
                        >
                        <UploadFileComponent/>
                    </Box>
                </Grid>
        </Grid>
    );
};

export default FilesGreed;