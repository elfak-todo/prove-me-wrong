import CircularProgress from '@mui/material/CircularProgress';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CommentDto } from '../../models/comment.dto';
import PostFeedData from '../../models/post.feed.dto';
import { SnackbarSettings } from '../../models/snackbar-settings';
import { getPostComments } from '../../services/comment.service';
import Comment from '../comment/Comment';
import './CommentList.css';

interface Props {
  isExpanded: boolean;
  postId: string;
  comments: CommentDto[] | null;
  setComments: Dispatch<SetStateAction<CommentDto[] | null>>;
  setSnackbar: Dispatch<SetStateAction<SnackbarSettings>>;
  setFeed: Dispatch<SetStateAction<PostFeedData[]>>;
}

function CommentList({
  isExpanded,
  postId,
  comments,
  setComments,
  setSnackbar,
  setFeed,
}: Props) {
  const [commentsLoaded, setCommentsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const coms = (await getPostComments(postId, 0, 'newest')).data;
        setComments(coms);
        setCommentsLoaded(true);
      } catch (e) {
        console.error(e);
      }
    };

    if (isExpanded && !commentsLoaded) {
      loadComments();
    }
  }, [isExpanded, commentsLoaded, postId, setComments]);

  if (comments === null) {
    return (
      <div className="comment-list-loading-container pt-1">
        <CircularProgress />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="pt-1">
        <p className="centered-text">Ništa za prikaz.</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((c) => (
        <Comment
          comment={c}
          key={c.id}
          setComments={setComments}
          postId={postId}
          setSnackbar={setSnackbar}
          setFeed={setFeed}
        />
      ))}
    </div>
  );
}

export default CommentList;
