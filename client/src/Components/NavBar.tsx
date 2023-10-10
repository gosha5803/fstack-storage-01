import React, { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Stack, Divider} from '@mui/material'
import {AccountCircleOutlined} from '@mui/icons-material'
import { registerApi } from '../api/authApi';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [logout, {}] = registerApi.useLazyLogoutQuery()
    const {isAuth} = useTypedSelector(state => state.authentication)
    const {login} = useTypedSelector(state => state.user.user)
    const pages = [
        {title: 'Главная', path: '/home', id:1},
        {title: 'Хранилище', path: '/storage', id:2}
    ]
    //Вынести кнокпи, как публичные и непубличные роутсы и через енум и интерфейсы назначить всё это дело.
    // Добавить сайдбар? возможно отображать иконку длязагрузки фала и для создания папки

    const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget)
        console.log(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
        logout()
    }

    return (
        <>
        {isAuth ? 
            <Box>
                <AppBar position='static'>
                    <Toolbar
                    sx={{
                        bgcolor:'secondary.dark',
                        justifyContent:'space-between'
                    }}
                    >
                        <Stack direction={'row'} alignItems={'center'}>
                        <Typography variant='h4' component={'div'}>uStorage</Typography>
                        <Divider orientation='vertical' flexItem sx={{ml:1, bgcolor:'white'}}/>
                        {pages.map(page => 
                            <NavLink to={page.path}>
                                <Button variant='text' key={page.id}
                                size='large'
                                sx={{
                                    color:'white',
                                    fontWeight:700,
                                    ':hover': {
                                        bgcolor:'secondary.main'
                                    }
                                }}
                                >{page.title}</Button>
                            </NavLink>    
                        )}
                        </Stack>
                        <Box
                        alignItems={'center'}
                        sx={{display: 'flex', alignItems: 'center'}}
                        >
                            <Typography variant='h6' component={'span'}>{login}</Typography>
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
                                    vertical:'bottom',
                                    horizontal:'right'
                                }}
                                keepMounted
                                onClose={() => setAnchorEl(null)}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                >
                                <MenuItem
                                onClick={handleClose}
                                >Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            :
            <Box>
                <AppBar position='static'>
                    <Toolbar
                    sx={{
                        bgcolor:'secondary.dark',
                        justifyContent:'space-between'
                    }}
                    >
                        <Typography variant='h4' component={'div'}>uStorage</Typography>
                        
                    </Toolbar>
                </AppBar>
            </Box>
        }
        </>
        
    );
};

export default NavBar;