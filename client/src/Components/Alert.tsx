import { Box, FormControlLabel, Slide, Switch, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
import React, {useState, useEffect} from 'react';

interface AlertProps {
    message: string | boolean | undefined
}

const AlertComponent: React.FC <AlertProps> = ({message}) => {
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        setVisible(!!message)
        setTimeout(() => {
            setVisible(false)
        }, 3000)
    }, [message])

    return (
        <Box
      sx={{
        height: 180,
        maxWidth: 500,
        zIndex: 1301,
        position:'absolute',
        top:81,
        right: 37,
      }}
    >
      <Slide direction="down" in={visible} mountOnEnter unmountOnExit>
        <Alert 
        severity='error'
        onClick={() => setVisible(false)}
        >
            {message}
        </Alert>
      </Slide>
    </Box>
    );
};

export default AlertComponent;