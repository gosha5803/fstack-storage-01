import { Box, Button, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, {useState} from 'react';

//Кастомный меню компонент, использует в себе MUI menu, но упрощает его создание, за счёт передачи в него параметров ниже.
//menuItems - массив типа menuItem, который представляет собой непосредственно кнопки меню со своим закголовком, иконкой и функционалом.
//menuButton и position - алтернативы, так как menu может быть статичной кнопкой, а может вызываться в динамическом месте по клику правой клавишей.
interface CustomMenuProps {
    menuItems: menuItem[]
    menuButton?: buttonMenu
    // visibility?: null | HTMLElement 
    position?: {left: number, top: number} | undefined
}
//Иконка кнопки и стандартные пропсы кнопки.
interface buttonMenu {
    btnSettings?: {
        text: string
        color: 'warning' | 'error' | 'success' | 'secondary'
        variant: 'outlined' | 'contained'
    } 
    icon?: React.ReactNode
}

//Элемент меню.
interface menuItem {
    title: string
    icons?: React.ReactNode
    action: () => void
}

const CustomMenu: React.FC<CustomMenuProps> = ({menuItems, menuButton, position}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = (item: menuItem) => {
        item.action()
        setAnchorEl(null)
    }

    return (
        <Box
        >
           {!menuButton?.icon ? 
           <Button
           color={menuButton?.btnSettings?.color}
           variant={menuButton?.btnSettings?.variant}
           onClick={handleClick}
           >
            {menuButton?.btnSettings?.text}
           </Button>
           :
           <IconButton
           onClick={handleClick}
           >
            {menuButton.icon}
           </IconButton>
           }

            {menuButton ?
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
            >
            {menuItems.map(item => 
            <MenuItem
            onClick={() => handleClose(item)}
            key={item.title}
            >
            {item.icons ? <ListItemIcon>{item.icons}</ListItemIcon> : ''}
                {item.title}</MenuItem>
            )}
            </Menu> 
            :
            <Menu
            id="basic-menu"
            anchorReference='anchorPosition'
            anchorPosition={position}
            open={!!position?.left}
            onClose={() => setAnchorEl(null)}
            >
            {menuItems.map(item => 
            <MenuItem
            onClick={() => handleClose(item)}
            key={item.title}
            >
            {item.icons ? <ListItemIcon>{item.icons}</ListItemIcon> : ''}
                {item.title}</MenuItem>
            )}
            </Menu>   
            }
            {/* <Menu
            id="basic-menu"
            
            anchorReference='anchorPosition'
            anchorPosition={position}
            open={!!position?.left || !!menuButton?.reference}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            
            >
            {menuItems.map(item => 
            <MenuItem
            onClick={() => handleClose(item)}
            key={item.title}
            >
            {item.icons ? <ListItemIcon>{item.icons}</ListItemIcon> : ''}
                {item.title}</MenuItem>
            )}
            </Menu> */}
      </Box>
    );
};

export default CustomMenu;