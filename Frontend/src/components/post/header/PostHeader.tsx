import { CardHeader, Typography } from '@mui/material';

import Post from '../../../models/post';
import User from '../../../models/user';
import UserAvatar from '../../avatar/UserAvatar';
import Options from '../../options/Options';

interface PostHeaderProps {
  post: Post;
  author: User;
}

function PostHeader({ post, author }: PostHeaderProps) {
  return (
    <CardHeader
      avatar={
        <UserAvatar name={`${author.firstName} ${author.lastName}`} size={48} />
      }
      action={<Options />}
      title={
        <Typography sx={{ mb: 0 }} variant="body1">
          {`${author.firstName} ${author.lastName}`}
        </Typography>
      }
      subheader="25. Decembar 2022"
    />
  );
}

export default PostHeader;
