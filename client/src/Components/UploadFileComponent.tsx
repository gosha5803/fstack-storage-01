import { FileUpload, AddCircle } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useActions } from '../hooks/useActions';

const UploadFileComponent = () => {
    // const [file, setFile] = useState<File| null>(null)
    const {} = useS()

    const fileHandler = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(!files) {
            return
        }
        const file = files[0]
        console.log(file)
        if(!file) {
            return
        }

        const formData = new FormData()
        formData.append('file', file)


        const response = await fetch('http://localhost:4080/api/folders/uploadFile', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()

    }

    return (
            <IconButton 
            color='secondary' 
            component='label'
            >
            <AddCircle/>
            {/* uplload */}
            <input 
            onChange={fileHandler}
            multiple={true}
            name='file'
            hidden 
            type='file'/>
            </IconButton>

    );
};

export default UploadFileComponent;