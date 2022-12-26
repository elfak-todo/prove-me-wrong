import {
  Avatar,
  Box,
  Button,
  Card,
  Typography,
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import lukaImg from "../../images/luka.jpg";

function Friend() {
  return (
    <Card sx={{ marginTop: 1 }} variant="outlined">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          m: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar src={lukaImg} sx={{ width: 48, height: 48, mr: 1 }} />
          <Typography mb={0} variant="body1">
            Luka Kocić
          </Typography>
        </Box>

        <Button variant="outlined" size="small" startIcon={<PersonAddIcon />}>
          Pošalji zahtev
        </Button>
      </Box>
    </Card>
  );
}

export default Friend;
