import { Autocomplete, Paper, TextField } from "@mui/material";
import { useLocation } from "react-router";
import "./Search.css";

function Search() {
  const location = useLocation();
  const opt = ["Luka Kocic", "Andrija Mitic", "Igor Antolovic"];
  return location.pathname === "/home" || location.pathname === "/topic" ? (
    <Paper className="search-main" elevation={2}>
      <Autocomplete
        freeSolo
        options={opt.map((option) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pretraži ljude, teme..."
            variant="outlined"
            color="primary"
          />
        )}
      />
    </Paper>
  ) : null;
}

export default Search;
