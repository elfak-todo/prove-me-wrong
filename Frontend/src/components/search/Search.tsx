import { Autocomplete, Paper, TextField } from "@mui/material";
import "./Search.css";

function Search() {
  const opt = ["Luka Kocic", "Andrija Mitic", "Igor Antolovic"];
  return (
    <Paper className="search-main" elevation={2}>
      <Autocomplete
        freeSolo
        options={opt.map((option) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pretraži ljude.."
            variant="outlined"
            color="primary"
          />
        )}
      />
    </Paper>
  );
}

export default Search;
