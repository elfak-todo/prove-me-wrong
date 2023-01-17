import { CardContent, Collapse } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { CommentDto } from '../../models/comment.dto';
import PostFeedData from '../../models/post.feed.dto';
import CommentForm from '../commentForm/CommentForm';
import CommentList from '../commentList/CommentList';

interface CommentSectionProps {
  isExpanded: boolean;
  postId: string;
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
  comments: CommentDto[] | null;
  setComments: Dispatch<SetStateAction<CommentDto[] | null>>;
}

function CommentSection({
  isExpanded,
  postId,
  setFeed,
  setComments,
  comments,
}: CommentSectionProps) {
  return (
    <Collapse in={isExpanded} collapsedSize={55}>
      <CardContent sx={{ padding: 1 }}>
        <CommentForm
          postId={postId}
          setFeed={setFeed}
          setComments={setComments}
        />
        <CommentList
          isExpanded={isExpanded}
          postId={postId}
          comments={comments}
          setComments={setComments}
        />
      </CardContent>
    </Collapse>
  );
}

export default CommentSection;
