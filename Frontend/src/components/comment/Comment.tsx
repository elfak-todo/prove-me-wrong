import { Card, CardContent, Typography } from '@mui/material';
import { CommentDto } from '../../models/comment.dto';
import UserAvatar from '../avatar/UserAvatar';
import CommentOptions from '../commentOptions/CommentOptions';
import './Comment.css';

interface Props {
  comment: CommentDto;
}

function Comment({ comment }: Props) {
  return (
    <div className="avatar-other">
      <UserAvatar
        name={`${comment.author.firstName} ${comment.author.lastName}`}
        size={32}
      />
      <div className="name-text-div">
        <Typography variant="body2">
          {comment.author.firstName} {comment.author.lastName} (
          {comment.author.username})
        </Typography>
        <Card className="comment-card" variant="outlined">
          <CardContent sx={{ padding: 1, margin: 0 }}>
            <Typography variant="body2">{comment.text}</Typography>
          </CardContent>
        </Card>
      </div>
      <CommentOptions />
    </div>
  );
}

export default Comment;
