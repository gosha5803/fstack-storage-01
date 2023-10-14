import { MoreVert, SvgIconComponent } from '@mui/icons-material';
import { Box, Button, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, {useState} from 'react';

interface CustomMenuProps {
    menuItems: menuItem[]
    menuButton?: buttonMenu
    visibility?: null | HTMLElement 
    position?: {left: number, top: number} | undefined
}

interface buttonMenu {
    btnSettings?: {
        text: string
        color: 'warning' | 'error' | 'success' | 'secondary'
        variant: 'outlined' | 'contained'
    } 
    icon?: React.ReactNode
    // reference: null | HTMLElement
}

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
        // sx={{position:'absolute', right: 700, top: 220}}
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