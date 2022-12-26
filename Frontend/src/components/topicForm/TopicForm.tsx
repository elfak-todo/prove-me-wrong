import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Stack } from "@mui/system";

interface TopicFormProps {
  setIsOpen: any;
}

function TopicForm({ setIsOpen }: TopicFormProps) {
  return (
    <>
      <DialogTitle>Kreiranje teme za diskusiju</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={2}>
          <TextField
            autoFocus
            margin="dense"
            label="Tema"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Opis teme"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)} variant="contained">
          Kreiraj
        </Button>
        <Button onClick={() => setIsOpen(false)} variant="outlined">
          Odustani
        </Button>
      </DialogActions>
    </>
  );
}

export default TopicForm;
