import { Avatar, Card, CardContent, Typography } from "@mui/material";
import lukaImg from "../../images/luka.jpg";
import Options from "../options/Options";
import "./Comment.css";

function Comment() {
  return (
    <div className="avatar-other">
      <Avatar src={lukaImg} sx={{ width: 32, height: 32, mr: 1}} />
      <div className="name-text-div">
        <Typography variant="body2">Luka Kocić</Typography>
        <Card className="comment-card" variant="outlined">
          <CardContent sx={{ padding: 1, margin: 0 }}>
            <Typography variant="body2">Ovo je jako dobar komentar!</Typography>
          </CardContent>
        </Card>
      </div>
      <Options />
    </div>
  );
}

export default Comment;
