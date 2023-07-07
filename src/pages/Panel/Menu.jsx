import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import Authorize from '../../components/Authorize'
import { AccountCircle } from '@mui/icons-material'
import roles from '../../roles'
import { NavLink } from 'react-router-dom'

const drawerWidth = 240

export const Menu = () => {
  return (
    <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
    variant="permanent"
  >
    <Toolbar />
    <Divider />
    <Authorize 
      roles = {[roles.ADMIN]}
    >
      <List>
          <NavLink
            to="/panel/users"
          >
            {({isActive}) => (
              <ListItem disablePadding>
                <ListItemButton selected={isActive}>
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary={"کاربران"} />
                    </ListItemButton>
              </ListItem>
            )}
          </NavLink>

      </List>
    </Authorize>

    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Drawer>
  )
}