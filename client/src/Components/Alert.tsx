import { Box, Slide, Alert } from '@mui/material';
import React, {useState, useEffect} from 'react';

//Переиспользуемый алерт, принимает в себя одно свойство message. 
interface AlertProps {
    message: string
}

const AlertComponent: React.FC <AlertProps> = ({message}) => {
    const [visible, setVisible] = useState<boolean>(false)

    //В момент рендера флаг видимости устанавливается на true, а через 3 секунды снова на false.
    //Также по клику на алерт флаг становится false немедленно.
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