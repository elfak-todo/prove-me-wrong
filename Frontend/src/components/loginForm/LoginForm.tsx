import { useRef, useState, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/user.service';
import './LoginForm.css';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import UserContext from '../userManager/UserManager';

function LoginForm() {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onLoginClicked = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setSnackbar({
        open: true,
        message: 'Molimo popunite korisničko ime i lozinku!',
        severity: 'error',
      });
      return;
    }

    try {
      const user = await login({
        username,
        password,
      });
      setUser(user.data);
      setSnackbar({
        open: true,
        message: 'Prijavljivanje je uspešno!',
        severity: 'success',
      });
      navigate('/home', { replace: true });
    } catch (err: any) {
      if (err.response) {
        switch (err.response.data) {
          case 'UserNotFound':
            setSnackbar({
              open: true,
              message: 'Korisnik nije pronađen!',
              severity: 'error',
            });
            break;
          case 'InvalidPassword':
            setSnackbar({
              open: true,
              message: 'Uneta lozinka nije ispravna!',
              severity: 'error',
            });
            break;
        }
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((s) => {
      return { ...s, open: false };
    });
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Card
          elevation={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: 250,
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="h5">Prijava</Typography>
            <Stack direction="row" spacing={1}>
              <Typography color="text.secondary" variant="subtitle2">
                Nemaš nalog?
              </Typography>
              <Typography
                sx={{ cursor: 'pointer' }}
                color="primary"
                variant="subtitle2"
                onClick={() => navigate('/register', { replace: true })}
              >
                Registruj se
              </Typography>
            </Stack>
            <Box component="form">
              <TextField
                sx={{ marginBottom: 2 }}
                label="Korisničko ime"
                variant="standard"
                required
                inputRef={usernameRef}
              />
              <TextField
                sx={{ marginBottom: 2 }}
                label="Lozinka"
                variant="standard"
                type="password"
                required
                inputRef={passwordRef}
              />
            </Box>
            <Button
              sx={{ alignSelf: 'center' }}
              variant="contained"
              onClick={onLoginClicked}
            >
              Prijavi se
            </Button>
          </CardContent>
        </Card>
        <div className="desc-text">
          <Typography
            sx={{ fontWeight: '600' }}
            color="primary.light"
            variant="h1"
          >
            Prove
          </Typography>
          <Typography
            sx={{ fontWeight: '600' }}
            color="primary.dark"
            variant="h1"
          >
            Me
          </Typography>
          <Typography sx={{ fontWeight: '800' }} variant="h1">
            Wrong!
          </Typography>
        </div>
      </Stack>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}

export default LoginForm;
