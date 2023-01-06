import { Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import PostFeedData from '../../models/post.feed.dto';
import Post from '../post/Post';

import './Feed.css';

interface PostFeedProps {
  feed: PostFeedData[];
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
}

function PostFeed({ feed, setFeed }: PostFeedProps) {
  return (
    <div className="feed-div-comp">
      {feed.length ? (
        feed.map((el) => (
          <Post key={el.post.id} feedEl={el} feed={feed} setFeed={setFeed} />
        ))
      ) : (
        <Typography variant="h6">Ništa za prikaz.</Typography>
      )}
    </div>
  );
}

export default PostFeed;
