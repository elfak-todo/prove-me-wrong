import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface PostFormProps {
  setIsOpen: any;
}

function PostForm({ setIsOpen }: PostFormProps) {
  return (
    <>
      <DialogTitle>Kreiranje objave</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Izrazite svoje mišljenje..."
          fullWidth
          multiline
          rows={4}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)} variant="contained">
          Objavi
        </Button>
        <Button onClick={() => setIsOpen(false)} variant="outlined">
          Odustani
        </Button>
      </DialogActions>
    </>
  );
}

export default PostForm;
