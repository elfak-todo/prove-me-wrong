import { CardActions, IconButton } from '@mui/material';
import ExpandMore from '../../expandMore/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dispatch, SetStateAction, useState } from 'react';
import Post from '../../../models/post';

interface PostFooterProps {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  post: Post;
}

function PostFooter({ isExpanded, setIsExpanded, post }: PostFooterProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <CardActions disableSpacing>
      <>
        <IconButton
          color={isLiked ? 'primary' : 'default'}
          onClick={() => setIsLiked(!isLiked)}
        >
          <FavoriteIcon />
        </IconButton>
        {post.likeCount}
      </>
      <>
        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
          <ModeCommentIcon />
        </IconButton>
        54
      </>
      <ExpandMore
        expand={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <ExpandMoreIcon />
      </ExpandMore>
    </CardActions>
  );
}

export default PostFooter;
