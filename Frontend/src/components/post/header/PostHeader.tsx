import { CardHeader, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useContext } from 'react';
import { dateSrp } from '../../../dateParser';

import Post from '../../../models/post';
import PostFeedData from '../../../models/post.feed.dto';
import User from '../../../models/user';
import UserAvatar from '../../avatar/UserAvatar';
import PostOptions from '../../postOptions/PostOptions';
import UserContext from '../../userManager/UserManager';

interface PostHeaderProps {
  post: Post;
  author: User;
  feed: PostFeedData[];
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
}

function PostHeader({ post, author, feed, setFeed }: PostHeaderProps) {
  const { user } = useContext(UserContext);

  return (
    <CardHeader
      avatar={
        <UserAvatar name={`${author.firstName} ${author.lastName}`} size={48} />
      }
      action={
        user?.id === author.id && <PostOptions post={post} feed={feed} setFeed={setFeed} />
      }
      title={
        <Typography sx={{ mb: 0 }} variant="body1">
          {`${author.firstName} ${author.lastName}`}
        </Typography>
      }
      subheader={post.datePublished && dateSrp(post.datePublished)}
    />
  );
}

export default PostHeader;
