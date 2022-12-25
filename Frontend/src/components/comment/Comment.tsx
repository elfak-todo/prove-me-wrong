import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";

import lukaImg from "../../images/luka.jpg";
import Options from "../options/Options";
import "./Comment.css";

function Comment() {
  return (
    <Stack direction="row" spacing={1} mt={2}>
      <Avatar src={lukaImg} sx={{ width: 32, height: 32 }} />
      <Card className="comment-card" variant="outlined">
        <CardContent sx={{ padding: 1, margin: 0 }}>
          <Typography variant="body2"> Ovo je jako dobar komentar!</Typography>
        </CardContent>
      </Card>
      <Options/>
    </Stack>
  );
}

export default Comment;
