import CircularProgress from '@mui/material/CircularProgress';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { CommentDto } from '../../models/comment.dto';
import { getPostComments } from '../../services/comment.service';
import Comment from '../comment/Comment';
import './CommentList.css';

interface Props {
  isExpanded: boolean;
  postId: string;
  comments: CommentDto[] | null;
  setComments: Dispatch<SetStateAction<CommentDto[] | null>>;
}

function CommentList({ isExpanded, postId, comments, setComments }: Props) {
  useEffect(() => {
    const loadComments = async () => {
      try {
        const coms = (await getPostComments(postId, 0)).data;
        setComments(coms);
        console.log(coms);
      } catch (e) {
        console.error(e);
      }
    };

    if (isExpanded && comments === null) {
      loadComments();
    }
  }, [isExpanded, comments, postId, setComments]);

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
        <Comment comment={c} key={c.id} />
      ))}
    </div>
  );
}

export default CommentList;
