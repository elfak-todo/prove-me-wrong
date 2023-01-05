import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
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

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    //TODO obavesti preko snackbar
    if (Object.values(user).some((value) => value === '')) return;

    registerUser(user)
      .then((res) => {
        //TODO isto obavesti preko snackbar
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
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
  );
}

export default RegisterForm;
