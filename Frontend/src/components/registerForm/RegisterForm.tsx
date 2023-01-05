import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  AlertColor,
  Snackbar,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserRegisterDto from '../../models/user.register.dto';
import { registerUser } from '../../services/user.service';

import './RegisterForm.css';

function RegisterForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserRegisterDto>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (Object.values(user).some((value) => value === '')) {
      setSnackbar({
        open: true,
        message: 'Molimo popunite sva polja!',
        severity: 'error',
      });
      return;
    }

    registerUser(user)
      .then((res) => {
        setSnackbar({
          open: true,
          message: 'Registracija je uspešna',
          severity: 'success',
        });
        setTimeout(() => navigate('/', { replace: true }), 1000);
      })
      .catch((err) => console.log(err));
  };

  const handleSnackbarClose = () => {
    setSnackbar((s) => {
      return { ...s, open: false };
    });
  };

  return (
    <>
      <Card className="reg-card" elevation={2}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="h5">Registracija</Typography>
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary" variant="subtitle2">
              Imaš nalog?
            </Typography>
            <Typography
              sx={{ cursor: 'pointer' }}
              color="primary"
              variant="subtitle2"
              onClick={() => navigate('/', { replace: true })}
            >
              Prijavi se
            </Typography>
          </Stack>
          <Box component="form">
            <TextField
              sx={{ marginBottom: 1 }}
              label="Ime"
              variant="standard"
              value={user.firstName}
              required
              onChange={(event) =>
                setUser({ ...user, firstName: event.target.value })
              }
            />
            <TextField
              sx={{ marginBottom: 1 }}
              label="Prezime"
              variant="standard"
              value={user.lastName}
              required
              onChange={(event) =>
                setUser({ ...user, lastName: event.target.value })
              }
            />
            <TextField
              sx={{ marginBottom: 1 }}
              label="Korisničko ime"
              variant="standard"
              value={user.username}
              required
              onChange={(event) =>
                setUser({ ...user, username: event.target.value })
              }
            />
            <TextField
              sx={{ marginBottom: 2 }}
              label="Lozinka"
              variant="standard"
              type="password"
              value={user.password}
              required
              onChange={(event) =>
                setUser({ ...user, password: event.target.value })
              }
            />
          </Box>
          <Button
            sx={{ alignSelf: 'center' }}
            variant="contained"
            onClick={handleRegister}
          >
            Kreiraj nalog
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}

export default RegisterForm;
