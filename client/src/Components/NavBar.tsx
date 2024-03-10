import { useTypedSelector } from '../hooks/useTypedSelector';
import {Box, AppBar, Toolbar, Typography, Button, Stack, Divider} from '@mui/material'
import { AccountCircleTwoTone } from '@mui/icons-material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { registerApi } from '../api/authApi';
import { NavLink } from 'react-router-dom';
import CustomMenu from '../interface/CustomMenu';

//Компонент навигационной панели приложения.
const NavBar = () => {
    //Состояние необходимое для MUI Menu элемента.
    // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    //Функция выхода из аккаунта, вызывается по кнопке logout в меню навигационной панели.
    const [logout, {}] = registerApi.useLazyLogoutQuery()
    //По флагу отрисовываются кнопки для перехода на cnhfybwe хранилищf, но только по значению true.
    const {isAuth} = useTypedSelector(state => state.authentication)
    //Логин нужен для отрисовки логина пользователя в панели.
    const {login} = useTypedSelector(state => state.user.user)
    //Массив отрисовываемых кнопок 
    const pages = [
        {title: 'Главная', path: '/home', id:1},
        {title: 'Хранилище', path: '/storage', id:2}
    ]
    //Вынести кнокпи, как публичные и непубличные роутсы и через енум и интерфейсы назначить всё это дело.
    // Добавить сайдбар? возможно отображать иконку длязагрузки фала и для создания папки

    // const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(e.currentTarget)
    //     console.log(e.currentTarget)
    // }

    // const handleClose = () => {
    //     setAnchorEl(null)
    //     logout()
    // }

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
                            <NavLink to={page.path} key={page.id}>
                                <Button 
                                variant='text' 
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
                            {/* <IconButton
                            onClick={handleMenu}
                            >
                                <AccountCircleOutlined
                                sx={{color:'white'}}
                                />
                            </IconButton> */}
                            {/* <Menu
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
                            </Menu> */}




                            {/*
                            Кастомный компонент меню, который принимает в себя menuButon{иконку} и menuItems {Заголовок, Функцию, которая отрабатывает при клике по опции менюшки и иконку опции.}
                            */}
                            <CustomMenu
                            menuButton={{
                                icon: <AccountCircleTwoTone sx={{color:'white', fontSize: 30}}/>
                            }}
                            menuItems={[
                                {title: 'Выйти', action: () => logout(), icons: <ExitToAppIcon color='secondary'/>}
                            ]}
                            />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            :
            //Вариант навигации при неавторизованном пользователе.
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