import CircularProgress from '@mui/material/CircularProgress';
import { FC, useState } from 'react';
import { CommentDto } from '../../models/comment.dto';

interface Props {
  isExpanded: boolean;
}

const CommentList: FC<Props> = ({ isExpanded }) => {
  const [comments, setComments] = useState<CommentDto[]>([]);

  if (!isExpanded) {
    return null;
  }

  if (comments.length === 0) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return <div></div>;
};

export default CommentList;
