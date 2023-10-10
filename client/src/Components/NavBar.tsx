import React, { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem} from '@mui/material'
import {AccountCircleOutlined} from '@mui/icons-material'

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const {isAuth} = useTypedSelector(state => state.authentication)

    const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
        console.log(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
        console.log(anchorEl)
    }

    return (
        <Box>
            <AppBar position='static'>
                <Toolbar
                sx={{
                    bgcolor:'secondary.dark',
                    justifyContent:'space-between'
                }}
                >
                    <Typography variant='h4' component={'div'}>YStorage</Typography>
                    <IconButton
                    onClick={handleMenu}
                    >
                        <AccountCircleOutlined
                        sx={{color:'white'}}
                        />
                    </IconButton>
                    <Menu
                        open={!!anchorEl}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical:'top',
                            horizontal:'right'
                        }}
                        keepMounted
                        onClose={handleClose}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        >
                            <MenuItem
                            onClick={() => setAnchorEl(null)}
                            >Logout
                            </MenuItem>
                        </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;