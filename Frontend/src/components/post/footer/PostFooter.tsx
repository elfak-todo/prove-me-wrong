import { CardActions, IconButton } from '@mui/material';
import ExpandMore from '../../expandMore/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dispatch, SetStateAction, useState } from 'react';
import { likeUnlinkePost } from '../../../services/post.service';
import PostFeedData from '../../../models/post.feed.dto';

interface PostFooterProps {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  feedEl: PostFeedData;
  feed: PostFeedData[];
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
}

function PostFooter({
  isExpanded,
  setIsExpanded,
  feedEl,
  feed,
  setFeed,
}: PostFooterProps) {
  const { post, liked, likeCount, commentCount } = feedEl;
  const [isLiked, setIsLiked] = useState<boolean>(liked);

  const handleLiking = () => {
    if (!post.id) return;

    likeUnlinkePost(post.id, !isLiked)
      .then(({ data }) => {
        setIsLiked(data);
        setFeed(
          feed.map((p) => {
            if (p.post.id === post.id) {
              return { ...p, likeCount: p.likeCount + (data ? 1 : -1) };
            }
            return p;
          })
        );
      })
      .catch(({ error }) => console.log(error));
  };

  return (
    <CardActions disableSpacing>
      <>
        <IconButton
          color={isLiked ? 'primary' : 'default'}
          onClick={handleLiking}
        >
          <FavoriteIcon />
        </IconButton>
        {likeCount}
      </>
      <>
        <IconButton onClick={() => setIsExpanded(!isExpanded)}>
          <ModeCommentIcon />
        </IconButton>
        {commentCount}
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
