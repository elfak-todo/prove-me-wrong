import { Card, CardContent, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import PostFeedData from '../../models/post.feed.dto';

import CommentSection from '../commentSection/CommentSection';
import PostFooter from './footer/PostFooter';
import PostHeader from './header/PostHeader';

interface PostProps {
  feedEl: PostFeedData;
  feed: PostFeedData[];
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
}

function Post({ feedEl, feed, setFeed }: PostProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { post, author } = feedEl;

  return (
    <Card sx={{ maxWidth: 800, minWidth: 700, marginTop: 5 }}>
      <PostHeader post={post} author={author} feed={feed} setFeed={setFeed} />
      <CardContent>
        <Typography variant="body2">{post.text}</Typography>
      </CardContent>
      <PostFooter
        post={post}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <CommentSection isExpanded={isExpanded} />
    </Card>
  );
}

export default Post;
