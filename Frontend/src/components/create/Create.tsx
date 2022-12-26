import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useLocation } from "react-router";

function Create() {
  const location = useLocation();

  return location.pathname === "/home" || location.pathname === "/topic" ? (
    <Fab
      sx={{
        position: "fixed",
        top: 80,
        left: 10,
      }}
      color="primary"
    >
      <AddIcon />
    </Fab>
  ) : null;
}

export default Create;
