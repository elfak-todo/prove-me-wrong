import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

function RegisterForm() {
  const navigate = useNavigate();
  return (
    <Card className="reg-card" elevation={2}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5">Registracija</Typography>
        <Stack direction="row" spacing={1}>
          <Typography color="text.secondary" variant="subtitle2">
            Imaš nalog?
          </Typography>
          <Typography
            sx={{ cursor: "pointer" }}
            color="primary"
            variant="subtitle2"
            onClick={() => navigate("/", { replace: true })}
          >
            Prijavi se
          </Typography>
        </Stack>
        <Box component="form">
          <TextField sx={{ marginBottom: 1 }} label="Ime" variant="standard" />
          <TextField
            sx={{ marginBottom: 1 }}
            label="Prezime"
            variant="standard"
          />
          <TextField
            sx={{ marginBottom: 1 }}
            label="Korisničko ime"
            variant="standard"
          />
          <TextField
            sx={{ marginBottom: 1 }}
            label="Email adresa"
            variant="standard"
          />
          <TextField
            sx={{ marginBottom: 2 }}
            label="Lozinka"
            variant="standard"
          />
        </Box>
        <Button sx={{ alignSelf: "center" }} variant="contained">
          Kreiraj nalog
        </Button>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
