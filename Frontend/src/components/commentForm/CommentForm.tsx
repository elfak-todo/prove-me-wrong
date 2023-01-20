import { Stack, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useRef } from 'react';
import { CommentCreateDto } from '../../models/comment.create.dto';
import { CommentDto } from '../../models/comment.dto';
import PostFeedData from '../../models/post.feed.dto';
import { SnackbarSettings } from '../../models/snackbar-settings';
import { createComment } from '../../services/comment.service';

import UserAvatar from '../avatar/UserAvatar';
import UserContext from '../userManager/UserManager';

interface Props {
  postId: string;
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
  setComments: Dispatch<SetStateAction<CommentDto[] | null>>;
  setSnackbar: Dispatch<SetStateAction<SnackbarSettings>>;
}

function CommentForm({ postId, setFeed, setComments, setSnackbar }: Props) {
  const { user } = useContext(UserContext);

  const commentTextFieldRef = useRef<HTMLTextAreaElement>(null);

  const onPostComment = async () => {
    const commentText = commentTextFieldRef?.current?.value;

    if (!commentText) return;

    const comment: CommentCreateDto = { postId: postId, text: commentText };

    try {
      const res = (await createComment(comment)).data;

      setSnackbar({
        open: true,
        message: 'Komentar je uspešno objavljen.',
        severity: 'success',
      });
      commentTextFieldRef.current.value = '';
      setComments((comments) => {
        if (!comments) {
          return [res];
        }
        return [res, ...comments];
      });
      setFeed((feed) =>
        feed.map((p) => {
          if (p.post.id === postId) {
            return { ...p, commentCount: p.commentCount + 1 };
          }
          return p;
        })
      );
    } catch (e) {
      console.error(e);
      setSnackbar({
        open: true,
        message: 'Došlo je do greške prilikom objavljivanja komentara.',
        severity: 'error',
      });
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <UserAvatar name={`${user?.firstName} ${user?.lastName}`} size={32} />
      <TextField
        size="small"
        fullWidth
        multiline
        rows={1}
        placeholder="Ostavi komentar"
        inputRef={commentTextFieldRef}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter' && !ev.shiftKey) {
            onPostComment();
            ev.preventDefault();
          }
        }}
      />
    </Stack>
  );
}

export default CommentForm;
