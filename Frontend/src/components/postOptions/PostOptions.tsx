import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Dispatch, SetStateAction, useState, MouseEvent, useContext } from 'react';
import Post from '../../models/post';
import PostFeedData from '../../models/post.feed.dto';
import { deletePost } from '../../services/post.service';

interface PostOptionsProps {
  post: Post;
  feed: PostFeedData[];
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
}

function PostOptions({ post, feed, setFeed }: PostOptionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDelete = (event: MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();

    if(!post.id) return;

    deletePost(post.id)
      .then(({data}) => setFeed(feed.filter((el) => el.post.id !== data.id)))
      .catch(({ error }) => console.log(error));

    setAnchorEl(null);
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
        <MenuItem onClick={() => setAnchorEl(null)}>Izmeni</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'red' }}>
          Obriši
        </MenuItem>
      </Menu>
    </>
  );
}

export default PostOptions;
