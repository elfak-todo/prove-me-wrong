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
import { UserRegisterData } from '../../models/user';
import { registerUser } from '../../services/user.service';

import './RegisterForm.css';

function RegisterForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserRegisterData>({
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
      .then((res) => navigate('/', { replace: true }))
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
            onChange={(event) =>
              setUser({ ...user, firstName: event.target.value })
            }
          />
          <TextField
            sx={{ marginBottom: 1 }}
            label="Prezime"
            variant="standard"
            value={user.lastName}
            onChange={(event) =>
              setUser({ ...user, lastName: event.target.value })
            }
          />
          <TextField
            sx={{ marginBottom: 1 }}
            label="Korisničko ime"
            variant="standard"
            value={user.username}
            onChange={(event) =>
              setUser({ ...user, username: event.target.value })
            }
          />
          <TextField
            sx={{ marginBottom: 2 }}
            label="Lozinka"
            variant="standard"
            value={user.password}
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
