import { useLocation, useNavigate } from 'react-router';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import './Navbar.css';
import UserContext from '../userManager/UserManager';
import { useContext } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user, setUser } = useContext(UserContext);

  return pathname !== '/' && pathname !== '/register' ? (
    <Paper
      sx={{ position: 'fixed', bottom: 10, left: 0, right: 0 }}
      className="navbar-main"
      elevation={3}
    >
      <Box sx={{ width: 500 }}>
        <BottomNavigation showLabels sx={{ bgcolor: 'primary.dark' }}>
          <BottomNavigationAction
            sx={{ color: 'white' }}
            label="Početna strana"
            icon={<HomeIcon />}
            onClick={() => navigate('/home')}
          />
          <BottomNavigationAction
            sx={{ color: 'white' }}
            label="Profil"
            icon={<AccountBoxIcon />}
            onClick={() => navigate(`/profile/${user?.id}`)}
          />
          <BottomNavigationAction
            sx={{ color: 'white' }}
            label="Odjavi se"
            icon={<LogoutIcon />}
            onClick={() => setUser(null)}
          />
        </BottomNavigation>
      </Box>
    </Paper>
  ) : null;
}

export default Navbar;
