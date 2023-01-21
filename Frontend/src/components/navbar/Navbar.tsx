import { useLocation, useNavigate } from 'react-router';
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Dialog,
  Paper,
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';

import './Navbar.css';
import UserContext from '../userManager/UserManager';
import { useContext, useEffect, useState } from 'react';
import Notifications from '../notifications/Notifications';
import { getFriendRequests } from '../../services/user.service';
import User from '../../models/user';

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [requests, setRequests] = useState<User[]>([]);

  useEffect(() => {
    if (pathname !== '/' && pathname !== '/register') {
      getFriendRequests()
        .then(({ data }) => setRequests(data))
        .catch(({ error }) => console.log(error));
    }
  }, [pathname]);

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
            onClick={() => {
              navigate('/home');
              setIsOpen(false);
            }}
          />
          <BottomNavigationAction
            sx={{ color: 'white' }}
            label="Obaveštenja"
            icon={
              <Badge badgeContent={requests.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            }
            onClick={() => setIsOpen(true)}
          />
          <BottomNavigationAction
            sx={{ color: 'white' }}
            label="Profil"
            icon={<AccountBoxIcon />}
            onClick={() => {
              navigate(`/profile/${user?.id}`);
              setIsOpen(false);
            }}
          />
          <BottomNavigationAction
            sx={{ color: 'white' }}
            label="Odjavi se"
            icon={<LogoutIcon />}
            onClick={() => {
              setUser(null);
              setIsOpen(false);
            }}
          />
        </BottomNavigation>
      </Box>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="md">
        <Notifications requests={requests} setRequests={setRequests} />
      </Dialog>
    </Paper>
  ) : null;
}

export default Navbar;
