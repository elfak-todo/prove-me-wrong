import { Alert, CardContent, Collapse, Snackbar } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { CommentDto } from '../../models/comment.dto';
import PostFeedData from '../../models/post.feed.dto';
import { SnackbarSettings } from '../../models/snackbar-settings';
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
  const [snackbar, setSnackbar] = useState<SnackbarSettings>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSnackbarClose = () => {
    setSnackbar((s) => {
      return { ...s, open: false };
    });
  };

  return (
    <>
      <Collapse in={isExpanded} collapsedSize={55}>
        <CardContent sx={{ padding: 1 }}>
          <CommentForm
            postId={postId}
            setFeed={setFeed}
            setComments={setComments}
            setSnackbar={setSnackbar}
          />
          <div className="pb-1"></div>
          <CommentList
            isExpanded={isExpanded}
            postId={postId}
            comments={comments}
            setComments={setComments}
            setSnackbar={setSnackbar}
            setFeed={setFeed}
          />
        </CardContent>
      </Collapse>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  );
}

export default CommentSection;
