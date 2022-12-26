import {
  Avatar,
  Stack,
  TextField,
} from "@mui/material";

import milanImg from "../../images/milan.jpg";

function CommentForm() {
  return (
    <Stack direction="row" spacing={1}>
      <Avatar src={milanImg} sx={{ width: 32, height: 32 }} />
      <TextField
        size="small"
        fullWidth
        multiline
        rows={1}
        placeholder="Ostavi komentar"
      />
    </Stack>
  );
}

export default CommentForm;
