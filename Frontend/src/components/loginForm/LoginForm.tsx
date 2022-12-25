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
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing={2}>
      <Card
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 250,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h5">Prijava</Typography>
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary" variant="subtitle2">
              Nemaš nalog?
            </Typography>
            <Typography
              sx={{ cursor: "pointer" }}
              color="primary"
              variant="subtitle2"
              onClick={() => navigate("/register", { replace: true })}
            >
              Registruj se
            </Typography>
          </Stack>
          <Box component="form">
            <TextField
              sx={{ marginBottom: 2 }}
              label="Korisničko ime"
              variant="standard"
            />
            <TextField
              sx={{ marginBottom: 2 }}
              label="Lozinka"
              variant="standard"
            />
          </Box>
          <Button
            sx={{ alignSelf: "center" }}
            variant="contained"
            onClick={() => navigate("/home", { replace: true })}
          >
            Prijavi se
          </Button>
        </CardContent>
      </Card>
      <div className="desc-text">
        <Typography
          sx={{ fontWeight: "600" }}
          color="primary.light"
          variant="h1"
        >
          Prove
        </Typography>
        <Typography
          sx={{ fontWeight: "600" }}
          color="primary.dark"
          variant="h1"
        >
          Me
        </Typography>
        <Typography sx={{ fontWeight: "800" }} variant="h1">
          Wrong!
        </Typography>
      </div>
    </Stack>
  );
}

export default LoginForm;
