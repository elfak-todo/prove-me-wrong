import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Dispatch, SetStateAction, MouseEvent, useState } from 'react';
import { useParams } from 'react-router';
import Post from '../../models/post';
import PostFeedData from '../../models/post.feed.dto';
import { createPost } from '../../services/post.service';

interface PostFormProps {
  feed: PostFeedData[];
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function PostForm({ feed, setFeed, setIsOpen }: PostFormProps) {
  const [post, setPost] = useState<Post>({ text: '' });
  const topicId: string | undefined = useParams().topicId;

  const handlePost = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (post.text === '' || !topicId) return;

    createPost(post, topicId)
      .then(({ data }) => setFeed([data, ...feed]))
      .catch(({ error }) => console.log(error));

    setIsOpen(false);
  };
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
          onChange={(event) => setPost({ ...post, text: event.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePost} variant="contained">
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
