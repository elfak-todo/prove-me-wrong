import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dispatch, SetStateAction, useState, MouseEvent } from 'react';
import Post from '../../models/post';
import PostFeedData from '../../models/post.feed.dto';
import { deletePost, editPost } from '../../services/post.service';

interface PostOptionsProps {
  post: Post;
  feed: PostFeedData[];
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
}

function PostOptions({ post, feed, setFeed }: PostOptionsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>(post.text);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDelete = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();

    if (!post.id) return;

    deletePost(post.id)
      .then(({ data }) => setFeed(feed.filter((el) => el.post.id !== data.id)))
      .catch(({ error }) => console.log(error));

    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (!text.length || !post.id) return;

    editPost(post.id, text).then((res) =>
      setFeed(
        feed.map((el) => {
          if (el.post.id === post.id)
            return { ...el, post: { ...post, text: text } };
          return el;
        })
      )
    );

    setIsOpen(false);
  };

  return (
    <>
      <IconButton
        sx={{ padding: 0 }}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            setIsOpen(true);
            setAnchorEl(null);
          }}
        >
          Izmeni
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'red' }}>
          Obriši
        </MenuItem>
      </Menu>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Izmena objave</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} variant="contained">
            Izmeni
          </Button>
          <Button onClick={() => setIsOpen(false)} variant="outlined">
            Odustani
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PostOptions;
