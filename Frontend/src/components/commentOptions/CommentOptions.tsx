import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Dispatch, SetStateAction, useState } from 'react';
import CardActions from '@mui/material/CardActions';
import { deleteComment, setLiked } from '../../services/comment.service';
import { CommentDto } from '../../models/comment.dto';
import { SnackbarSettings } from '../../models/snackbar-settings';
import PostFeedData from '../../models/post.feed.dto';

interface Props {
  comment: CommentDto;
  postId: string;
  setComments: Dispatch<SetStateAction<CommentDto[] | null>>;
  setSnackbar: Dispatch<SetStateAction<SnackbarSettings>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
}

function CommentOptions({
  comment,
  postId,
  setComments,
  setSnackbar,
  setEditMode,
  setFeed,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClicked = async () => {
    handleClose();
    try {
      await deleteComment(postId, comment.id);
      setComments((comments) => {
        if (!comments) {
          return comments;
        }
        return comments.filter((c) => c.id !== comment.id);
      });
      setFeed((feed) =>
        feed.map((p) => {
          if (p.post.id === postId) {
            return { ...p, commentCount: p.commentCount - 1 };
          }
          return p;
        })
      );
      setSnackbar({
        open: true,
        message: 'Komentar je uspešno obrisan.',
        severity: 'success',
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditClicked = () => {
    handleClose();
    setEditMode(true);
  };

  const handleSetLiekdClicked = async () => {
    try {
      const { data: isLikedResponse } = await setLiked(
        postId,
        comment.id,
        !comment.isLiked
      );

      setComments((comments) => {
        if (!comments) {
          return comments;
        }
        return comments.map((c) => {
          if (c.id !== comment.id) {
            return c;
          }
          var newLikeCount = comment.likeCount;
          if (comment.isLiked !== isLikedResponse) {
            if (isLikedResponse) {
              newLikeCount++;
            } else {
              newLikeCount--;
            }
          }
          return { ...c, isLiked: isLikedResponse, likeCount: newLikeCount };
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <CardActions disableSpacing>
        <IconButton
          color={comment.isLiked ? 'primary' : 'default'}
          onClick={handleSetLiekdClicked}
        >
          <FavoriteIcon />
        </IconButton>
        {comment.likeCount}
      </CardActions>
      <IconButton sx={{ padding: 0 }} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleEditClicked}>Izmeni</MenuItem>
        <MenuItem onClick={handleDeleteClicked} sx={{ color: 'red' }}>
          Obriši
        </MenuItem>
      </Menu>
    </>
  );
}

export default CommentOptions;
