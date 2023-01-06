import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import PostFeedData from '../../models/post.feed.dto';

interface PostFormProps {
  feed: PostFeedData[];
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function PostForm({ feed, setFeed, setIsOpen }: PostFormProps) {
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
