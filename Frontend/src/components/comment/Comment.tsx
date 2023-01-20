import { Card, CardContent, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { dateSrp } from '../../dateParser';
import { CommentDto } from '../../models/comment.dto';
import PostFeedData from '../../models/post.feed.dto';
import { SnackbarSettings } from '../../models/snackbar-settings';
import { editComment } from '../../services/comment.service';
import UserAvatar from '../avatar/UserAvatar';
import CommentOptions from '../commentOptions/CommentOptions';
import './Comment.css';

interface Props {
  comment: CommentDto;
  setComments: Dispatch<SetStateAction<CommentDto[] | null>>;
  setSnackbar: Dispatch<SetStateAction<SnackbarSettings>>;
  postId: string;
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
}

function Comment({
  comment,
  setComments,
  postId,
  setSnackbar,
  setFeed,
}: Props) {
  const [editMode, setEditMode] = useState<boolean>(false);

  const commentTextFieldRef = useRef<HTMLTextAreaElement>(null);

  const onEditComment = async () => {
    const newText = commentTextFieldRef.current?.value;
    if (!newText) {
      return;
    }
    try {
      const { data: resComment } = await editComment({
        commentId: comment.id,
        text: newText,
      });

      setComments((comments) => {
        if (!comments) {
          return comments;
        }
        return comments.map((c) => (c.id === resComment.id ? resComment : c));
      });

      setSnackbar({
        open: true,
        message: 'Komentar je uspešno izmenjen.',
        severity: 'success',
      });
      setEditMode(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="avatar-other">
      <UserAvatar
        name={`${comment.author.firstName} ${comment.author.lastName}`}
        size={32}
      />
      <div className="name-text-div">
        <div className="comment-head">
          <Typography variant="body2">
            {comment.author.firstName} {comment.author.lastName} (
            {comment.author.username})
          </Typography>
          <Typography variant="body2">
            {comment.publicationTime && dateSrp(comment.publicationTime)}
          </Typography>
        </div>
        <Card className="comment-card" variant="outlined">
          <CardContent sx={{ padding: 1, margin: 0 }}>
            {editMode ? (
              <TextField
                size="small"
                fullWidth
                multiline
                rows={1}
                placeholder="Izmeni komentar"
                defaultValue={comment.text}
                inputRef={commentTextFieldRef}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter' && !ev.shiftKey) {
                    onEditComment();
                    ev.preventDefault();
                  }
                }}
              />
            ) : (
              <Typography variant="body2">{comment.text}</Typography>
            )}
          </CardContent>
        </Card>
      </div>
      <CommentOptions
        comment={comment}
        postId={postId}
        setComments={setComments}
        setSnackbar={setSnackbar}
        setEditMode={setEditMode}
        setFeed={setFeed}
      />
    </div>
  );
}

export default Comment;
