import { Card, CardContent, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { CommentDto } from '../../models/comment.dto';
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

  const [comments, setComments] = useState<CommentDto[] | null>(null);

  return (
    <Card sx={{ maxWidth: 800, minWidth: 700, marginTop: 5 }}>
      <PostHeader post={post} author={author} feed={feed} setFeed={setFeed} />
      <CardContent>
        <Typography variant="body2">{post.text}</Typography>
      </CardContent>
      <PostFooter
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        feedEl={feedEl}
        feed={feed}
        setFeed={setFeed}
      />
      {post.id && (
        <CommentSection
          isExpanded={isExpanded}
          postId={post.id}
          setFeed={setFeed}
          comments={comments}
          setComments={setComments}
        />
      )}
    </Card>
  );
}

export default Post;
