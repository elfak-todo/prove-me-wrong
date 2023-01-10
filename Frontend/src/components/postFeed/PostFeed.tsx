import { Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import PostFeedData from '../../models/post.feed.dto';
import Create from '../create/Create';
import Post from '../post/Post';
import PostForm from '../postForm/PostForm';

import './Feed.css';

interface PostFeedProps {
  feed: PostFeedData[];
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
}

function PostFeed({ feed, setFeed }: PostFeedProps) {
  return (
    <>
      <div className="feed-div-comp">
        {feed.length ? (
          feed.map((el) => (
            <Post key={el.post.id} feedEl={el} feed={feed} setFeed={setFeed} />
          ))
        ) : (
          <Typography variant="h6">Ništa za prikaz.</Typography>
        )}
      </div>
      <Create Form={PostForm} feed={feed} setFeed={setFeed} />
    </>
  );
}

export default PostFeed;
